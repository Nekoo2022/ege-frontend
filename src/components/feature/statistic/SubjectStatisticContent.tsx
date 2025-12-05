"use client";

import { useGetSubjectsStatisticQuery } from "@/graphql/generated/output";
import { useMemo } from "react";
import { SubjectStatisticHeader } from "./SubjectStatisticHeader";
import { OverallStatistic } from "./OverallStatistic";
import { SubjectStatisticGrid } from "./SubjectStatisticGrid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/common/Card";
import { Button } from "@/components/ui/common/Button";
import { UserPlus, LogIn, ArrowRightIcon } from "lucide-react";

export function SubjectStatisticContent() {
  const { data, loading, error } = useGetSubjectsStatisticQuery();
  const subjectsStatistic = data?.GetSubjectsStatistic ?? [];

  const { totalAnswered, totalCorrect, overallPercent } = useMemo(() => {
    const totalAnswered = subjectsStatistic.reduce((sum, s) => sum + s.answered, 0);
    const totalCorrect = subjectsStatistic.reduce((sum, s) => sum + s.correct, 0);
    const overallPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return { totalAnswered, totalCorrect, overallPercent };
  }, [subjectsStatistic]);

  if (!loading && error?.message === "Сессия не найдена") {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          <Card className="text-center p-8">
            <CardHeader className="items-center justify-center">
              <UserPlus className="size-16 text-[#7b21e2] mx-auto opacity-90" />
              <CardTitle className="text-2xl font-semibold mt-3">Чтобы просмотреть статистику</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground max-w-xl mx-auto">
                Для доступа к персональной статистике требуется войти в аккаунт или зарегистрироваться. Это поможет
                сохранять ваш прогресс и синхронизировать результаты на разных устройствах.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center items-center">
                <Link href="/user/create">
                  <Button
                    className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] hover:from-[#6b1bd0] hover:to-[#8d7ce4] text-white shadow-md hover:shadow-lg transition-all px-5 py-3 rounded-md flex items-center gap-2"
                    size="lg"
                  >
                    Зарегистрироваться
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </Link>
                <Link href="/user/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#7b21e2] text-[#7b21e2] hover:bg-[#7b21e2]/5 font-medium px-5 py-3 rounded-md flex items-center gap-2"
                  >
                    Войти
                    <LogIn className="size-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (error)
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
        Произошла ошибка при загрузке статистики
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Заголовок и общая статистика */}
      <SubjectStatisticHeader />

      {!loading && subjectsStatistic.length > 0 && (
        <OverallStatistic {...{ totalAnswered, totalCorrect, overallPercent }} />
      )}

      {/* Сетка статистики */}
      <SubjectStatisticGrid loading={loading} subjectsStatistic={subjectsStatistic} />
    </div>
  );
}
