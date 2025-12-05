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
import { Button } from "@/components/ui/common/Button";
import { Power } from "lucide-react";

interface SessionRemoveDialogProps {
  isCurrent: boolean;
  handleRemoveSession: () => void;
}

export function SessionRemoveDialog({ isCurrent, handleRemoveSession }: SessionRemoveDialogProps) {
  console.log(isCurrent);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive text-destructive-foreground" disabled={isCurrent}>
          <Power className="mr-1 size-4" /> Завершить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите завершить сессию?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-destructive text-destructive-foreground"
              disabled={isCurrent}
              onClick={() => handleRemoveSession()}
            >
              <Power className="mr-1 size-4" /> Завершить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
