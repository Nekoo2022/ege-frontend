"use client";

import { motion } from "framer-motion";
import { Heart, BookOpenIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/utils";

interface SubjectCardProps {
  slug: string;
  name: string;
  questionsCount: number;
  isFavorite?: boolean;
  handleToggle?: (slug: string) => void;
  animating?: Record<string, boolean>;
  isAuthentificated?: boolean;
}

export function SubjectCard({
  slug,
  name,
  questionsCount,
  isFavorite = false,
  handleToggle,
  animating,
  isAuthentificated,
}: SubjectCardProps) {
  const isAnimating = animating?.[slug];

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="w-full"
    >
      <Link href={`subject/${slug}/`}>
        <motion.div
          className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          whileHover={{ borderColor: "var(--primary)" }}
        >
          {/* Градиентная полоска сверху */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/80 to-primary/60" />

          <div className="flex flex-col p-6">
            {/* Заголовок и иконка избранного */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-primary/10 to-primary/10 group-hover:from-primary/20 group-hover:to-primary/20 transition-all">
                  <BookOpenIcon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {name}
                </h3>
              </div>
              {isAuthentificated && (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggle?.(slug);
                  }}
                  whileTap={{ scale: 0.85 }}
                  animate={{ rotate: isAnimating ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                  className="flex items-center justify-center size-9 rounded-lg hover:bg-accent transition-colors ml-2 shrink-0"
                >
                  <Heart
                    className={cn(
                      "size-5 transition-all duration-200",
                      isFavorite ? "text-primary fill-primary" : "text-muted-foreground group-hover:text-primary"
                    )}
                    fill={isFavorite ? "#7b21e2" : "none"}
                  />
                </motion.button>
              )}
            </div>

            {/* Статистика */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-2 rounded-full bg-[#7b21e2]" />
                  <span className="text-sm font-medium">
                    {questionsCount}{" "}
                    {questionsCount === 1 ? "задание" : questionsCount < 5 ? "задания" : "заданий"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Открыть</span>
                <ArrowRightIcon className="size-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
