import { TabsContent } from "@/components/ui/common/Tabs";
import { TaskItem } from "../TaskItem";
import { useTaskContext } from "../../context/TaskContext";

export function TaskTabsContent() {
  const { taskList, skip, slug, taskNumber, answers, setAnswers } = useTaskContext();
  console.log(taskList);
  return (
    <>
      {taskList.map((task, index) => (
        <TabsContent key={index} value={String(index)}>
          <TaskItem
            task={{
              ...task,
              taskNumber: (task as any).taskNumber ?? taskNumber,
              explanation: task.explanation!,
            }}
            isCorrect={answers[task.id]}
            setIsCorrect={(val) => setAnswers((prev) => ({ ...prev, [task.id]: val }))}
            slug={slug}
            taskIndex={skip + index + 1}
          />
        </TabsContent>
      ))}
    </>
  );
}
