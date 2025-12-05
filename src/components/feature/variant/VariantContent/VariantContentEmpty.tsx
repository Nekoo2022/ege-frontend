import { Button } from "@/components/ui/common/Button";
import { QueryResult } from "@apollo/client";
import { motion } from "framer-motion";
import { useState } from "react";

//Компонент, если нету вариантов
interface VariantEmptyProps {
  loading: boolean;
  refetch: QueryResult["refetch"];
}

export function VariantEmpty({ loading, refetch }: VariantEmptyProps) {
  const [isRefetching, setIsRefetching] = useState(false);

  async function handleRefetch() {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  }

  return (
    <motion.div
      className="text-center py-16 rounded-2xl border border-border bg-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold">У вас пока нет вариантов</h2>
      <motion.p
        className="text-muted-foreground mt-2 text-sm"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Как только появятся сохраненные варианты, они отобразятся здесь.
      </motion.p>
    </motion.div>
  );
}
