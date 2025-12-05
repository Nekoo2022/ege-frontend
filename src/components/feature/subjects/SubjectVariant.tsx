import { FindSubjectBySlugQuery } from "@/graphql/generated/output";
import { SubjectVariantItem } from "./SubjectVariantItem";
import { motion } from "framer-motion";

interface SubjectVariantProps {
  taskList: FindSubjectBySlugQuery["FindSubjectBySlug"];
}

export interface FetchedData {
  slug: string;
  taskNumber: number;
  count: number;
}

export type FetchedDataList = FetchedData[];

export interface FetchedDataSelections {
  selections: FetchedDataList;
}

export function SubjectVariant({ taskList }: SubjectVariantProps) {
  //   console.log(taskList);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold">Выберите задания</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Нажимайте плюс, чтобы добавить нужное количество по каждому номеру
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
      >
        {taskList.map((task) => (
          <motion.div
            key={task.taskNumber}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          >
            <SubjectVariantItem task={task} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
