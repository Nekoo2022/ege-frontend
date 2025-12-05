import { Button } from "@/components/ui/common/Button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FindUserVariantAllQuery } from "@/graphql/generated/output";
import { motion } from "framer-motion";
import { Eye, ListChecks } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";

interface VariantCardProps {
  variant: FindUserVariantAllQuery["FindUserVariantAll"][0];
  handleRemove: (variantId: number) => void;
}

//Карточка варианта
export function VariantCard({ variant, handleRemove }: VariantCardProps) {
  const tasks = variant.questions;

  return (
    <motion.div
      key={variant.id}
      layout
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-border rounded-xl transition-colors hover:border-[#7b21e2]/10 hover:shadow-sm">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-[#7b21e2]/30 rounded-t-2xl" />
        <CardHeader className="pt-2">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[#7b21e2]/5 text-[#7b21e2] flex items-center justify-center border border-border">
              <ListChecks className="size-4" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl leading-tight">Вариант № {variant.id}</CardTitle>
              <CardDescription className="mt-0.5">Вопросов: {tasks.length}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="justify-end gap-2 pt-0">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-[#7b21e2]/5"
              onClick={() => (window.location.href = `/variant/russian/${variant.id}`)}
            >
              <Eye className="mr-1.5" /> Открыть
            </Button>
          </motion.div>
          <DeleteDialog variantId={variant.id} handleRemove={handleRemove} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
