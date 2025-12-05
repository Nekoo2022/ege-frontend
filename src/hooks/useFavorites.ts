"use client";

import { useState, useEffect, useCallback } from "react";
import { useToggleFavoriteSubjectMutation } from "@/graphql/generated/output";

export function useFavorites(initialSlugs: string[] = []) {
  const [favoritesState, setFavoritesState] = useState<Record<string, boolean>>({});
  const [animating, setAnimating] = useState<Record<string, boolean>>({});
  const [toggleFavorite] = useToggleFavoriteSubjectMutation({});

  // Инициализация состояния при изменении initialSlugs
  useEffect(() => {
    const state: Record<string, boolean> = {};
    initialSlugs.forEach((slug) => {
      state[slug] = true;
    });
    setFavoritesState(state);
  }, [initialSlugs.join(",")]);

  const handleToggle = useCallback(
    async (slug: string) => {
      // Анимация
      setAnimating((prev) => ({ ...prev, [slug]: true }));
      // Мгновенное обновление UI
      setFavoritesState((prev) => ({ ...prev, [slug]: !prev[slug] }));

      try {
        await toggleFavorite({
          variables: { data: { slug } },
          refetchQueries: ["FindFavoriteSubjects"], // обновление данных из сервера
        });
      } catch (error) {
        console.error("Ошибка при изменении избранного:", error);
        // Откат в случае ошибки
        setFavoritesState((prev) => ({ ...prev, [slug]: !prev[slug] }));
      }

      setTimeout(() => {
        setAnimating((prev) => ({ ...prev, [slug]: false }));
      }, 2000);
    },
    [toggleFavorite]
  );

  return { favoritesState, animating, handleToggle };
}
