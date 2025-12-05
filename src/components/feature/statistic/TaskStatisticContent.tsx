"use client";

import { motion } from "framer-motion";
import { useGetTasksStatisticQuery } from "@/graphql/generated/output";
import { TaskStatisticItem } from "./TaskStatisticItem";
import Link from "next/link";
import { RotateCcwIcon, ClipboardListIcon } from "lucide-react";
import { Button } from "@/components/ui/common/Button";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { useMemo } from "react";

interface TaskStatisticContentProps {
  slug: string;
}

export function TaskStatisticContent({ slug }: TaskStatisticContentProps) {
  const { data, loading } = useGetTasksStatisticQuery({
    variables: { data: { subjectSlug: slug } },
  });
  const tasksStatistic = data?.GetTasksStatistic ?? [];

  const { overallPercent } = useMemo(() => {
    const totalAnswered = tasksStatistic.reduce((sum, t) => sum + t.answered, 0);
    const totalCorrect = tasksStatistic.reduce((sum, t) => sum + t.correct, 0);
    const overallPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return { totalAnswered, totalCorrect, overallPercent };
  }, [tasksStatistic]);

  return (
    <div className="space-y-8">
      {/* Заголовок и кнопка */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md">
            <ClipboardListIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#5e52cb]">Статистика по заданиям</h2>
            {!loading && tasksStatistic.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Общая точность: <span className="font-semibold text-[#7b21e2]">{overallPercent}%</span>
              </p>
            )}
          </div>
        </div>
        <Link href={`/subject/${slug}/incorrect`}>
          <Button className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] hover:from-[#6b1bd0] hover:to-[#8d7ce4] shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <RotateCcwIcon className="size-4" />
            Перерешать задания
          </Button>
        </Link>
      </motion.div>

      {/* Сетка заданий */}
      {loading ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full h-56 rounded-2xl" />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {tasksStatistic.map((taskStatistic, index) => (
            <motion.div
              key={taskStatistic.taskNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TaskStatisticItem {...taskStatistic} slug={slug} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
