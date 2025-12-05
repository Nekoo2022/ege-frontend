import { Card, CardContent, CardHeader } from "@/components/ui/common/Card";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { motion } from "framer-motion";

//Компонент загрузки вариантов
export function VariantContentLoading() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.04 },
    },
  } as const;

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-border">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 5 }).map((__, j) => (
                <Skeleton key={j} className="h-6 w-10 rounded-full" />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
