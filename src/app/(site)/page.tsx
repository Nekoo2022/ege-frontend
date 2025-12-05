"use client";

import { useAuth } from "@/hooks/useAuth";
import { useFindFavoriteSubjectsQuery, useFindMeQuery, useGetAllStatisticQuery } from "@/graphql/generated/output";
import { LoadingBlock } from "@/components/feature/home/LoadingBlock";
import { AuthPrompt } from "@/components/feature/home/AuthPrompt";
import { StatisticCards } from "@/components/feature/home/StatisticCards";
import { NoFavoriteSubjects } from "@/components/feature/home/NoFavoriteSubjects";
import { FavoriteSubjects } from "@/components/feature/home/FavoriteSubjects";

export default function HomePage() {
  const { isAuthentificated, isAuthLoading } = useAuth();
  const { data, loading: FindFavoriteSubjectsLoading } = useFindFavoriteSubjectsQuery({
    skip: !isAuthentificated,
    fetchPolicy: "cache-first",
  });
  const { data: userData, loading: userLoading } = useFindMeQuery({
    skip: !isAuthentificated,
    fetchPolicy: "cache-first",
  });
  const { data: statsData, loading: GetAllStatisticLoading } = useGetAllStatisticQuery({
    skip: !isAuthentificated,
    fetchPolicy: "cache-and-network",
  });

  // Всегда вызываем хуки до условных возвратов
  const favoriteSubjects = data?.FindFavoriteSubjects ?? [];
  const user = userData?.FindMe.user;
  const stats = statsData?.GetAllStatistic;
  const favoriteSlugs = favoriteSubjects.map((s) => s.slug);

  const isLoading = isAuthLoading || FindFavoriteSubjectsLoading || userLoading || GetAllStatisticLoading;

  // Теперь можно делать условные возвраты после всех хуков
  if (isLoading) {
    return <LoadingBlock />;
  }

  // Если пользователь не авторизован, не показываем данные
  if (!isAuthentificated) {
    return <AuthPrompt />;
  }

  if (favoriteSubjects.length === 0) {
    return (
      <div className="space-y-8">
        <StatisticCards stats={stats!} user={user!} />
        <NoFavoriteSubjects />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatisticCards stats={stats!} user={user!} />
      <FavoriteSubjects favoriteSlugs={favoriteSlugs} favoriteSubjects={favoriteSubjects} />
    </div>
  );
}
