import { motion } from "framer-motion";
import { ChartBarIcon } from "lucide-react";

export function SubjectStatisticHeader() {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-lg">
          <ChartBarIcon className="size-7" />
        </div>
        <h1 className="text-4xl font-bold text-[#5e52cb]">Статистика по предметам</h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
        Отслеживайте свой прогресс по каждому предмету. Видите, сколько заданий решено и какой процент правильных
        ответов.
      </p>
    </motion.div>
  );
}
