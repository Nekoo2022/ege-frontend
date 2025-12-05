interface TaskItemHeaderProps {
  isCorrect: "full" | "partial" | "wrong" | "no-correct" | undefined;
  taskIndex?: number;
  taskNumber?: number;
}

export function TaskItemHeader({ isCorrect, taskIndex, taskNumber }: TaskItemHeaderProps) {
  return (
    <h3
      className={`text-xl font-bold md:text-2xl pb-4 ${
        isCorrect === "full"
          ? "text-green-600"
          : isCorrect === "partial"
          ? "text-yellow-600"
          : isCorrect === "wrong"
          ? "text-red-600"
          : "text-foreground"
      }`}
    >
      Задание № {taskNumber ?? taskIndex}
    </h3>
  );
}
