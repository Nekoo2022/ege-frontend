import { ResetAnswersDialog } from "./ResetAnswersDialog";

interface TasksHeaderProps {
  taskNumber: number | string;
  answeredCount: number;
  handleResetAll: () => void;
  isPracticeMode?: boolean;
}

export function TasksHeader({ taskNumber, answeredCount, handleResetAll, isPracticeMode }: TasksHeaderProps) {
  if (!isPracticeMode) {
    return <h1 className="text-center text-3xl font-semibold mb-5">Работа над ошибками</h1>;
  }

  return (
    <div className="flex items-center justify-between bg-card rounded-xl shadow-md mb-4 w-full h-14 px-4">
      <div className="flex items-center gap-3">
        <div className="text-lg font-medium">Задания {taskNumber}</div>
        <div className="text-lg text-muted-foreground ml-10">
          {answeredCount > 0 ? `ответов сохранено: ${answeredCount}` : `Ответы не выбраны`}
        </div>
      </div>
      <ResetAnswersDialog answeredCount={answeredCount} handleResetAll={handleResetAll} />
    </div>
  );
}
