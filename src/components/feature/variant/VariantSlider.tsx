"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFindUserVariantByIdQuery } from "@/graphql/generated/output";
import { VariantItem } from "./VariantItem";

const VISIBLE_COUNT = 20;
const EDGE_THRESHOLD = 4;

export function VariantSlider({ slug, variantId }: { slug: string; variantId: number }) {
  const { data, loading } = useFindUserVariantByIdQuery({ variables: { variantId } });
  const questions = data?.FindUserVariantById.questions || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < maxScrollLeft - 1); // -1 на случай дробных пикселей
    };

    handleScroll(); // инициализация
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [questions]);

  const getItemWidth = () => (containerRef.current ? containerRef.current.clientWidth / VISIBLE_COUNT : 0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = getItemWidth();
    const scrollLeft = container.scrollLeft;
    const firstVisibleIndex = Math.round(scrollLeft / itemWidth);
    const centerIndex = firstVisibleIndex + Math.floor(VISIBLE_COUNT / 2);

    if (index < centerIndex - EDGE_THRESHOLD) {
      container.scrollTo({ left: itemWidth * (index - Math.floor(VISIBLE_COUNT / 2)), behavior: "smooth" });
    } else if (index > centerIndex + EDGE_THRESHOLD) {
      container.scrollTo({ left: itemWidth * (index - Math.floor(VISIBLE_COUNT / 2)), behavior: "smooth" });
    }
  };

  const handleArrow = (dir: "prev" | "next") => {
    const container = containerRef.current;
    if (!container) return;
    const itemWidth = getItemWidth();
    container.scrollBy({
      left: dir === "next" ? itemWidth * VISIBLE_COUNT : -itemWidth * VISIBLE_COUNT,
      behavior: "smooth",
    });
  };

  // Skeleton при загрузке
  if (loading)
    return (
      <div className="space-y-6">
        <div className="flex gap-2 overflow-x-auto py-4">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="w-9 h-9 rounded-full bg-gray-300 animate-pulse shrink-0" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((_, idx) => (
            <div key={idx} className="h-60 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );

  // Если вопросов нет
  if (!questions.length)
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12 text-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronLeft className="w-12 h-12 text-gray-400 rotate-180" />
        <p className="text-xl font-semibold text-gray-500">В этом варианте пока нет вопросов</p>
        <p className="text-gray-400 max-w-md">
          Похоже, что к этому варианту ещё не добавлены задания. Вы можете вернуться позже или создать новый
          вариант.
        </p>
      </motion.div>
    );

  return (
    <div>
      {/* Навигационная полоса */}
      <div className="relative flex items-center bg-card rounded-xl shadow-md mb-6 w-full h-20">
        <button
          onClick={() => handleArrow("prev")}
          disabled={!canScrollPrev}
          className={`z-20 w-10 h-10 flex items-center justify-center bg-background border rounded-full shadow-md ml-2 mr-3 shrink-0 
            ${!canScrollPrev ? "opacity-40 cursor-not-allowed" : "hover:bg-muted"}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div ref={containerRef} className="flex overflow-hidden flex-1" style={{ scrollSnapType: "x mandatory" }}>
          {questions.map((_, idx) => (
            <div
              key={idx}
              className="shrink-0 scroll-snap-align-start"
              style={{ width: `calc(100% / ${VISIBLE_COUNT})` }}
            >
              <motion.button
                onClick={() => handleItemClick(idx)}
                className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full border border-border text-sm font-medium"
                animate={{
                  backgroundColor: idx === activeIndex ? "#7b21e2" : "#fff",
                  color: idx === activeIndex ? "#fff" : "#000",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {idx + 1}
              </motion.button>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleArrow("next")}
          disabled={!canScrollNext}
          className={`z-20 w-10 h-10 flex items-center justify-center bg-background border rounded-full shadow-md mr-2 shrink-0 
            ${!canScrollNext ? "opacity-40 cursor-not-allowed" : "hover:bg-muted"}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Контент активного элемента с анимацией */}
      <AnimatePresence mode="wait">
        {questions[activeIndex] && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <VariantItem {...questions[activeIndex]} slug={slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
