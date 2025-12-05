import { Button } from "@/components/ui/common/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/common/AlertDialog";

interface ResetAnswersDialogOptions {
  answeredCount: number;
  handleResetAll: () => void;
}

export function ResetAnswersDialog({ answeredCount, handleResetAll }: ResetAnswersDialogOptions) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" aria-label="Сбросить ответы" disabled={answeredCount === 0}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Сбросить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите сбросить ответы на задания?</AlertDialogTitle>
          <AlertDialogDescription>
            При нажатии на кнопку сбросить вы потеряете все сохранённые ответы. Подтвердите, если уверены.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleResetAll}>Сбросить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
