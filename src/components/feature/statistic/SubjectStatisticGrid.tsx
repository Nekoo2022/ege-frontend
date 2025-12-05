import { Skeleton } from "@/components/ui/common/Skeleton";
import { GetSubjectsStatisticQuery } from "@/graphql/generated/output";
import { motion } from "framer-motion";
import { SubjectStatisticItem } from "./SubjectStatisticItem";

interface SubjectStatisticGridProps {
  loading: boolean;
  subjectsStatistic: GetSubjectsStatisticQuery["GetSubjectsStatistic"];
}

export function SubjectStatisticGrid({ loading, subjectsStatistic }: SubjectStatisticGridProps) {
  if (loading) {
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="w-full h-48 rounded-2xl" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {subjectsStatistic.map((subjectStatistic, index) => (
        <motion.div
          key={subjectStatistic.subjectSlug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <SubjectStatisticItem {...subjectStatistic} />
        </motion.div>
      ))}
    </motion.div>
  );
}
