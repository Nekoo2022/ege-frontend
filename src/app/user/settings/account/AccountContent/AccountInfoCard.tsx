import { FadeIn } from "@/components/ui/animations/FadeIn";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";

interface AccountInfoCardProps {
  initial: string;
  email: string;
}

// карточка с информацией о пользователе
export function AccountInfoCard({ initial, email }: AccountInfoCardProps) {
  return (
    <FadeIn delay={0.05}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">{initial}</div>
            <div>
              <CardTitle>Ваш аккаунт</CardTitle>
              <CardDescription>{email}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </FadeIn>
  );
}
