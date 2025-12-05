"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFindAllSubjectsQuery, useFindFavoriteSubjectsQuery } from "@/graphql/generated/output";
import { SubjectCard } from "./SubjectCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { BookOpenIcon, SparklesIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SubjectContent() {
  const { data: allSubjectsData, loading: isLoadingAllSubjects } = useFindAllSubjectsQuery();
  const allSubjects = allSubjectsData?.FindAllSubjects ?? [];

  const { isAuthentificated } = useAuth();

  const { data: favoriteSubjectsData, loading: isLoadingFavoriteSubjects } = useFindFavoriteSubjectsQuery();
  const favoriteSubjects = favoriteSubjectsData?.FindFavoriteSubjects ?? [];
  const favoriteSlugs = favoriteSubjects.map((s) => s.slug);

  const { favoritesState, animating, handleToggle } = useFavorites(favoriteSlugs);

  const isLoading = isLoadingAllSubjects || isLoadingFavoriteSubjects;

  const totalQuestions = allSubjects.reduce((sum, s) => sum + s.questionsCount, 0);

  // Drag-and-drop ordering state
  const [orderedSlugs, setOrderedSlugs] = useState<string[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  // Initialize local order from storage and merge with fetched subjects
  useEffect(() => {
    const slugs = allSubjects.map((s) => s.slug);
    if (slugs.length === 0) return;
    try {
      const stored = JSON.parse(localStorage.getItem("subjectsOrder") || "[]") as string[];
      const filtered = stored.filter((slug) => slugs.includes(slug));
      const missing = slugs.filter((slug) => !filtered.includes(slug));
      const next = [...filtered, ...missing];
      setOrderedSlugs(next);
    } catch {
      setOrderedSlugs(slugs);
    }
  }, [allSubjects]);

  const orderedSubjects = useMemo(() => {
    if (!orderedSlugs.length) return allSubjects;
    const indexMap = new Map(orderedSlugs.map((s, i) => [s, i] as const));
    return [...allSubjects].sort((a, b) => (indexMap.get(a.slug) ?? 0) - (indexMap.get(b.slug) ?? 0));
  }, [allSubjects, orderedSlugs]);

  function onDragStart(e: React.DragEvent, slug: string) {
    setDragging(slug);
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", slug);
    } catch {}
  }

  function onDragOver(e: React.DragEvent, slug: string) {
    e.preventDefault();
    if (over !== slug) setOver(slug);
  }

  function onDrop(e: React.DragEvent, targetSlug: string) {
    e.preventDefault();
    if (!dragging || dragging === targetSlug) return;
    const from = orderedSlugs.indexOf(dragging);
    const to = orderedSlugs.indexOf(targetSlug);
    if (from === -1 || to === -1) return;
    const next = [...orderedSlugs];
    next.splice(from, 1);
    next.splice(to, 0, dragging);
    setOrderedSlugs(next);
    try {
      localStorage.setItem("subjectsOrder", JSON.stringify(next));
    } catch {}
    setDragging(null);
    setOver(null);
  }

  function onDragEnd() {
    setDragging(null);
    setOver(null);
  }

  return (
    <div className="space-y-8">
      {/* Заголовок и описание */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-lg">
            <BookOpenIcon className="size-7" />
          </div>
          <h1 className="text-4xl font-bold text-[#5e52cb]">Все предметы ЕГЭ</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          В этом разделе собраны все практические материалы для подготовки к ЕГЭ 2026. Решения, задачи и ответы —
          всё, что поможет вам уверенно пройти экзамен и прокачать свои знания до максимума!
        </p>
        {!isLoading && allSubjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mt-6 px-6 py-3 bg-linear-to-r from-[#7b21e2]/10 to-[#9d8cf4]/10 rounded-xl border border-[#7b21e2]/20"
          >
            <SparklesIcon className="size-5 text-[#7b21e2]" />
            <span className="text-sm font-medium text-muted-foreground">
              Всего доступно <span className="font-bold text-[#7b21e2]">{totalQuestions}</span> заданий по{" "}
              <span className="font-bold text-[#7b21e2]">{allSubjects.length}</span>{" "}
              {allSubjects.length === 1 ? "предмету" : "предметам"}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Сетка предметов */}
      {isLoading ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-40 rounded-2xl" />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {orderedSubjects.map((subject, index) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <div
                  draggable
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => onDragStart(e, subject.slug)}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e, subject.slug)}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e, subject.slug)}
                  onDragEnd={onDragEnd}
                  className={
                    `w-full ${over === subject.slug ? "ring-2 ring-violet-400 rounded-2xl" : ""} ` +
                    `${dragging === subject.slug ? "opacity-80" : ""}`
                  }
                >
                  <SubjectCard
                    slug={subject.slug}
                    name={subject.name}
                    questionsCount={subject.questionsCount}
                    isFavorite={favoritesState[subject.slug]}
                    animating={animating}
                    handleToggle={handleToggle}
                    isAuthentificated={isAuthentificated}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
