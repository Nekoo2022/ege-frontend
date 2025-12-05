import { Card, CardContent } from "@/components/ui/common/Card";
import { FindMeQuery, GetAllStatisticQuery } from "@/graphql/generated/output";
import { motion } from "framer-motion";
import { TrendingUpIcon, TrophyIcon, ZapIcon } from "lucide-react";
import { useMemo } from "react";

interface StatisticCardsProps {
  user: FindMeQuery["FindMe"]["user"];
  stats: GetAllStatisticQuery["GetAllStatistic"];
}

export function StatisticCards({ user, stats }: StatisticCardsProps) {
  console.log(user);
  console.log(user?.email);
  const ratingLabelMap: Record<string, string> = useMemo(
    () => ({
      BEGINNER: "Новичок",
      INTERMEDIATE: "Продвинутый",
      ADVANCED: "Опытный",
      EXPERT: "Эксперт",
    }),
    []
  );
  const getRatingLabel = (rating?: string | null) => {
    if (!rating) return "—";
    const key = rating.toString().toUpperCase();
    return ratingLabelMap[key] ?? rating;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1"
    >
      <Card className="bg-linear-to-br from-primary to-primary/80 text-white border-0 hover:scale-[1.02] transition-transform duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <ZapIcon className="size-6" />
            <h3 className="text-lg font-semibold">Опыт</h3>
          </div>
          <p className="text-3xl font-bold">{user?.experience || 0}</p>
          <p className="text-sm opacity-90 mt-1">очков опыта</p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-primary/80 to-primary text-white border-0 hover:scale-[1.02] transition-transform duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrophyIcon className="size-6" />
            <h3 className="text-lg font-semibold">Рейтинг</h3>
          </div>
          <p className="text-3xl font-bold">
            {getRatingLabel(typeof user?.rating === "string" ? user.rating : undefined)}
          </p>
          <p className="text-sm opacity-90 mt-1">в общем рейтинге</p>
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-primary/60 to-primary/80 text-white border-0 hover:scale-[1.02] transition-transform duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUpIcon className="size-6" />
            <h3 className="text-lg font-semibold">Точность</h3>
          </div>
          <p className="text-3xl font-bold">{stats ? stats.correctPercent : 0}%</p>
          <p className="text-sm opacity-90 mt-1">
            {stats && stats.totalAnswer > 0
              ? `${stats.totalCorrectAnswer} из ${stats.totalAnswer}`
              : "Нет решенных"}{" "}
            задач
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
