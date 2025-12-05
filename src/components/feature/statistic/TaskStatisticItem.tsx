"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, ArrowRightIcon, HashIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/utils";

interface TaskStatisticItemProps {
  correct: number;
  answered: number;
  correctPercent: number;
  totalQuestions: number;
  taskNumber: number;
  slug: string;
}

export function TaskStatisticItem({
  correctPercent,
  answered,
  totalQuestions,
  taskNumber,
  slug,
  correct,
}: TaskStatisticItemProps) {
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
    <Link href={`/subject/${slug}/incorrect/${taskNumber}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Градиентная полоска сверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7b21e2] via-[#9d8cf4] to-[#af76dd]" />

        <div className="flex flex-col p-6 items-center text-center">
          {/* Номер задания */}
          <div className="relative flex items-center justify-center size-16 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-lg mb-4">
            <HashIcon className="size-8 opacity-30" />
            <span className="absolute text-2xl font-bold">{taskNumber}</span>
          </div>

          {/* Прогресс бар */}
          <div className="w-full mb-4">
            <div className="flex items-center justify-center mb-2">
              <span className={cn("text-2xl font-bold", getPercentColor(correctPercent))}>{correctPercent}%</span>
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
          <div className="space-y-2 w-full mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Всего</span>
              <span className="font-semibold text-foreground">{totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Решено</span>
              <span className="font-semibold text-[#7b21e2]">{answered}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <CheckCircleIcon className="size-4" />
                Правильно
              </span>
              <span className="font-semibold text-green-600">{correct}</span>
            </div>
          </div>

          {/* Кнопка перехода */}
          <div className="flex items-center gap-1 text-[#7b21e2] opacity-0 group-hover:opacity-100 transition-opacity w-full pt-4 border-t border-border justify-center">
            <span className="text-sm font-medium">Открыть</span>
            <ArrowRightIcon className="size-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
