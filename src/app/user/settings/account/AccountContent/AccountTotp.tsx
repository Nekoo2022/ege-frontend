import { FadeIn } from "@/components/ui/animations/FadeIn";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Separator } from "@/components/ui/common/Separator";
import { Shield } from "lucide-react";
import { TotpDialog } from "./TotpDialog";
import { QueryResult } from "@apollo/client";

interface AccountTotpProps {
  isTwoFactor: boolean;
  refetch: QueryResult["refetch"];
}

//компонент для подключения TOTP
export function AccountTotp({ isTwoFactor, refetch }: AccountTotpProps) {
  return (
    <FadeIn delay={0.08}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center">
              <Shield className="size-5" />
            </div>
            <div>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Двухфакторная аутентификация (TOTP)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-2">
          <h3 className="font-medium">Аутентификация с помощью TOTP</h3>
          <p className="text-sm text-muted-foreground">
            Увеличьте безопасность аккаунта, активировав TOTP. При каждом входе потребуется одноразовый код из
            приложения-аутентикатора.
          </p>
        </CardContent>
        <CardFooter>
          <TotpDialog isTwoFactor={isTwoFactor} refetch={refetch} />
        </CardFooter>
      </Card>
    </FadeIn>
  );
}
