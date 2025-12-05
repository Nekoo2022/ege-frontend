import { motion } from "framer-motion";
import { BookOpenIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function NoFavoriteSubjects() {
  return (
    <div className="space-y-8">
      {/* Сообщение о том, что нет любимых предметов */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="text-center py-12"
      >
        <BookOpenIcon className="size-20 text-[#7b21e2] mx-auto mb-4 opacity-50" />
        <h2 className="text-3xl font-bold text-[#5e52cb] mb-3">У вас пока нет любимых предметов</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
          Добавьте предметы в избранное, чтобы быстро переходить к ним с главной страницы
        </p>
        <Link href="/subject">
          <motion.button
            className="px-8 py-4 bg-[#7b21e2] text-white rounded-lg font-semibold text-lg hover:bg-[#6b1bd0] transition-colors flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Посмотреть все предметы
            <ArrowRightIcon className="size-5" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
