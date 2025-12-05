import { Button } from "@/components/ui/common/Button";
import { TabsList, TabsTrigger } from "@/components/ui/common/Tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTaskContext } from "../../context/TaskContext";
import { TASKS_PER_PAGE } from "../../constants/constants";

export function TaskTabsList() {
  const { skip, totalTasks, taskList, answers, handleNext, handlePrev } = useTaskContext();

  return (
    <TabsList className="relative flex items-center justify-start bg-card rounded-xl shadow-md mb-10 w-full h-20 p-4">
      <Button
        onClick={handlePrev}
        disabled={skip === 0}
        variant="outline"
        aria-label="Предыдущие задания"
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-2"
      >
        <ChevronLeft className="w-4 h-4" aria-label="Предыдущие задания" />
      </Button>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-start">
        {taskList.map((task, index) => {
          const answer = answers[task.id]; // теперь AnswerStatus
          const bgClass =
            answer === "full"
              ? "bg-green-400 text-white"
              : answer === "partial"
              ? "bg-yellow-400 text-white"
              : answer === "wrong"
              ? "bg-red-400 text-white"
              : "text-muted-foreground hover:border-[#7b21e2]";

          return (
            <TabsTrigger
              key={index}
              value={String(index)}
              aria-label={`Открыть задание ${skip + index + 1}`}
              className={`
        w-9 h-9 flex items-center
        rounded-full border border-border text-sm font-medium cursor-pointer transition-colors
        ${bgClass}
        data-[state=active]:bg-[#7b21e2] data-[state=active]:text-white
      `}
            >
              {skip + index + 1}
            </TabsTrigger>
          );
        })}
      </div>

      <Button
        onClick={handleNext}
        disabled={skip + TASKS_PER_PAGE >= totalTasks}
        variant="outline"
        aria-label="Следующие задания"
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 absolute right-4"
      >
        <ChevronRight className="w-4 h-4" aria-label="Следующие задания" />
      </Button>
    </TabsList>
  );
}
