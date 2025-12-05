import { motion } from "framer-motion";
import { TrendingUpIcon } from "lucide-react";

interface OverallStatisticProps {
  overallPercent: number;
  totalCorrect: number;
  totalAnswered: number;
}

export function OverallStatistic({ overallPercent, totalAnswered, totalCorrect }: OverallStatisticProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#7b21e2]/10 to-[#9d8cf4]/10 rounded-xl border border-[#7b21e2]/20"
    >
      <TrendingUpIcon className="size-6 text-[#7b21e2]" />
      <div className="text-left">
        <span className="text-sm text-muted-foreground">Общая точность:</span>
        <span className="ml-2 text-2xl font-bold text-[#7b21e2]">{overallPercent}%</span>
        <span className="ml-2 text-sm text-muted-foreground">
          ({totalCorrect} из {totalAnswered} решенных)
        </span>
      </div>
    </motion.div>
  );
}
