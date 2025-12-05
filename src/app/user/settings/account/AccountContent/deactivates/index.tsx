import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/common/Card";

import { AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/ui/animations/FadeIn";
import { Separator } from "@/components/ui/common/Separator";
import { QueryResult } from "@apollo/client";
import { DeactivateDialog } from "./DeactivateDialog";

interface AccountDeactivateProps {
  isDeactivated: boolean;
  isTwoFactor: boolean;
  refetch: QueryResult["refetch"];
  telegramId: string | null;
}

// всё, что связано с деактивацией аккаунта
export function AccountDeactivate({ isDeactivated, isTwoFactor, refetch, telegramId }: AccountDeactivateProps) {
  return (
    <FadeIn delay={0.12}>
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-red-500/10 text-red-600 dark:text-red-500 grid place-items-center">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <CardTitle>Деактивация</CardTitle>
              <CardDescription>Отключение аккаунта и последствия</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-2">
          <h3 className="font-medium">Деактивация аккаунта</h3>
          <p className="text-sm text-muted-foreground">
            После деактивации вход станет недоступен. Через 7 дней аккаунт будет полностью удалён. До этого можно обратиться в
            поддержку для восстановления доступа.
          </p>
        </CardContent>
        <CardFooter>
          <DeactivateDialog isDeactivated={isDeactivated} isTwoFactor={isTwoFactor} refetch={refetch} telegramId={telegramId} />
        </CardFooter>
      </Card>
    </FadeIn>
  );
}
