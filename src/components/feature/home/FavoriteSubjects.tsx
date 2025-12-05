import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { SubjectCard } from "../subjects/SubjectCard";
import { useFavorites } from "@/hooks/useFavorites";
import { FindFavoriteSubjectsQuery } from "@/graphql/generated/output";
import Link from "next/link";

interface FavoriteSubjectsProps {
  favoriteSlugs: string[];
  favoriteSubjects: FindFavoriteSubjectsQuery["FindFavoriteSubjects"];
}

export function FavoriteSubjects({ favoriteSlugs, favoriteSubjects }: FavoriteSubjectsProps) {
  const { favoritesState, animating, handleToggle } = useFavorites(favoriteSlugs);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#5e52cb] mb-2">Ваши любимые предметы</h1>
          <p className="text-muted-foreground">Быстрый доступ к предметам, которые вы добавили в избранное</p>
        </div>
        <Link
          href="/subject"
          className="text-[#7b21e2] hover:text-[#6b1bd0] font-medium flex items-center gap-1 hover:scale-[1.02] transition-all duration-200"
        >
          Все предметы
          <ArrowRightIcon className="size-4" />
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AnimatePresence>
          {favoriteSubjects.map(({ slug, name, questionsCount }, index) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SubjectCard
                slug={slug}
                name={name}
                questionsCount={questionsCount}
                isFavorite={favoritesState[slug]}
                animating={animating}
                handleToggle={handleToggle}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
