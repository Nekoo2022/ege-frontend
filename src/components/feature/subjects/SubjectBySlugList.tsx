"use client";

import { useFindSubjectBySlugQuery } from "@/graphql/generated/output";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { useSubjectVariantContext } from "./context/SubjectVariantContext";
import { SubjectVariant } from "./SubjectVariant";
import { motion } from "framer-motion";

export default function SubjectBySlugList() {
  const { slug, flag, setFlag } = useSubjectVariantContext();

  const { data, loading: isLoading } = useFindSubjectBySlugQuery({
    variables: { slug },
  });

  const pathname = usePathname();

  const tasksList = data?.FindSubjectBySlug ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <Skeleton className="h-28 rounded-2xl" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (tasksList.length === 0) {
    return (
      <motion.div
        className="text-center text-muted-foreground py-16"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.p
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Задания не найдены
        </motion.p>
      </motion.div>
    );
  }

  if (!flag) {
    return <SubjectVariant taskList={tasksList} />;
  }

  if (flag) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tasksList.map((taskItem, index) => (
          <motion.div
            key={taskItem.taskNumber}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            whileHover={{ y: -2, scale: 1.005 }}
            whileTap={{ scale: 0.997 }}
          >
            <Link
              href={pathname + `/task/${taskItem.taskNumber}`}
              className="group relative block rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7b21e2] via-[#9d8cf4] to-[#af76dd]" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Задание</div>
                  <div className="mt-1 text-xl font-bold text-foreground group-hover:text-[#5e52cb] transition-colors">
                    № {taskItem.taskNumber}
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100">
                  {taskItem.questionsCount}{" "}
                  {taskItem.questionsCount === 1 ? "задача" : taskItem.questionsCount < 5 ? "задачи" : "задач"}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Открыть задания</span>
                <span className="text-[#7b21e2] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }
}
