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
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
  variantId: number;
  handleRemove: (variantId: number) => void;
}
//Компонент с окном удаления варианта
export function DeleteDialog({ variantId, handleRemove }: DeleteDialogProps) {
  const [removing, setRemoving] = useState(false);

  function onRemove() {
    setRemoving(true);
    handleRemove(variantId);
    setRemoving(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/5">
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Если вы нажмете на кнопку удалить, то вариант навсегда исчезнет без возможности восстановления
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/5 bg-transparent"
              onClick={onRemove}
              disabled={removing}
            >
              <Trash2 className="mr-1.5" /> Удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
