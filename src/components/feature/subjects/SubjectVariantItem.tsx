import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Separator } from "@/components/ui/common/Separator";
import { FindSubjectBySlugQuery } from "@/graphql/generated/output";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FetchedData } from "./SubjectVariant";
import { useSubjectVariantContext } from "./context/SubjectVariantContext";

interface SubjectVariantItemProps {
  task: FindSubjectBySlugQuery["FindSubjectBySlug"][0];
}

export function SubjectVariantItem({ task }: SubjectVariantItemProps) {
  const { taskNumber, questionsCount } = task;
  const [count, setCount] = useState(0);

  const { slug, fetchedData } = useSubjectVariantContext();

  console.log(fetchedData);

  function Increment() {
    if (count < questionsCount) {
      setCount((v) => {
        const newCount = v + 1;

        const index = fetchedData.findIndex((f) => f.taskNumber === taskNumber);
        if (index > -1) {
          fetchedData[index].count = newCount;
          //   console.log(index);
        } else {
          fetchedData.push({ taskNumber, count: newCount, slug });
        }

        return newCount;
      });
    } else {
      toast.error("Максимальное количество заданий");
    }
  }

  function Decrement() {
    if (count > 0) {
      setCount((v) => {
        const newCount = v - 1;

        const index = fetchedData.findIndex((f) => f.taskNumber === taskNumber);
        if (index > -1) {
          if (newCount === 0) {
            fetchedData.splice(index, 1);
          } else {
            fetchedData[index].count = newCount;
          }
        }

        return newCount;
      });
    }
  }

  const q = task.questionsCount;
  const qText = q % 10 === 1 ? "задача" : q % 10 === 0 ? "задач" : q % 10 < 5 ? "задачи" : "задач";

  return (
    <Card className="group relative overflow-hidden border-border/80 hover:shadow-md transition-shadow">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7b21e2] via-[#9d8cf4] to-[#af76dd]" />
      <CardHeader className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl">Задание № {taskNumber}</CardTitle>
          <div className="text-xs text-muted-foreground mt-1">Добавьте нужное количество задач этого номера</div>
        </div>
        <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100">
          {q} {qText}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <Button
            aria-label="Уменьшить"
            variant="outline"
            size="icon-sm"
            onClick={Decrement}
            disabled={count === 0}
            className="shrink-0"
          >
            <Minus className="size-4" />
          </Button>
          <div className="min-w-14 h-10 grid place-items-center rounded-md bg-input/30 dark:bg-input/20 text-foreground font-semibold">
            {count}
          </div>
          <Button aria-label="Увеличить" variant="outline" size="icon-sm" onClick={Increment} className="shrink-0">
            <Plus className="size-4" />
          </Button>
          <div className="ml-auto text-sm text-muted-foreground">Сколько добавить в вариант</div>
        </div>
      </CardContent>
    </Card>
  );
}
