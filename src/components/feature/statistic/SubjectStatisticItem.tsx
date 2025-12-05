"use client";

import { motion } from "framer-motion";
import { BookOpenIcon, ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

interface SubjectStatisticItemProps {
  subjectSlug: string;
  correct: number;
  subjectName: string;
  answered: number;
  correctPercent: number;
  totalQuestions: number;
}

export function SubjectStatisticItem({
  subjectSlug,
  subjectName,
  correctPercent,
  answered,
  totalQuestions,
  correct,
}: SubjectStatisticItemProps) {
  const pathname = usePathname();

  const getPercentColor = (percent: number) => {
    if (percent >= 80) return "text-green-600";
    if (percent >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getPercentBgColor = (percent: number) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Link href={pathname + "/" + subjectSlug}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Градиентная полоска сверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7b21e2] via-[#9d8cf4] to-[#af76dd]" />

        <div className="flex flex-col p-6">
          {/* Заголовок */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-[#7b21e2]/10 to-[#9d8cf4]/10 group-hover:from-[#7b21e2]/20 group-hover:to-[#9d8cf4]/20 transition-all">
              <BookOpenIcon className="size-6 text-[#7b21e2]" />
            </div>
            <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-[#5e52cb] transition-colors flex-1">
              {subjectName}
            </h3>
          </div>

          {/* Прогресс бар */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Точность</span>
              <span className={cn("text-lg font-bold", getPercentColor(correctPercent))}>{correctPercent}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${correctPercent}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={cn("h-full rounded-full", getPercentBgColor(correctPercent))}
              />
            </div>
          </div>

          {/* Статистика */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500" />
                Всего заданий
              </span>
              <span className="font-semibold text-foreground">{totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <div className="size-2 rounded-full bg-purple-500" />
                Решено
              </span>
              <span className="font-semibold text-[#7b21e2]">{answered}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <CheckCircleIcon className="size-4" />
                Правильно
              </span>
              <span className="font-semibold text-green-600">{correct}</span>
            </div>
          </div>

          {/* Кнопка перехода */}
          <div className="flex items-center gap-1 text-[#7b21e2] opacity-0 group-hover:opacity-100 transition-opacity mt-auto pt-4 border-t border-border">
            <span className="text-sm font-medium">Подробнее</span>
            <ArrowRightIcon className="size-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
