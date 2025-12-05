"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Separator } from "@/components/ui/common/Separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputTotp";
import { Button } from "@/components/ui/common/Button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useVerifyPasswordRecoveryTokenMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function VerifyRecoveryContent() {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setEmail(localStorage.getItem("recovery_email"));
  }, []);

  console.log(email);

  const [verify] = useVerifyPasswordRecoveryTokenMutation({
    onCompleted() {
      localStorage.removeItem("email");
      router.push("/user/password-recovery/new-password");
    },
    onError(error) {
      toast.error("Ошибка при подтверждении токена");
      console.log(error);
    },
  });

  function handleVerify() {
    if (email) verify({ variables: { data: { tokenValue: code, email } } });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#f4f0ff] via-[#f7f7ff] to-[#eef2ff]">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md">
            <ShieldCheck className="size-7" />
          </div>
          <CardTitle className="text-2xl">Подтверждение восстановления</CardTitle>
          <p className="text-sm text-muted-foreground">
            Введите 6-значный код, отправленный на вашу почту и телеграм, если он у вас включен
          </p>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 w-full">
            <div className="w-full flex justify-center">
              <InputOTP maxLength={6} className="w-full" value={code} onChange={setCode}>
                <InputOTPGroup className="flex w-full max-w-sm items-center justify-center gap-3">
                  <InputOTPSlot index={0} className="h-14 w-12 text-2xl rounded-lg text-center" />
                  <InputOTPSlot index={1} className="h-14 w-12 text-2xl rounded-lg text-center" />
                  <InputOTPSlot index={2} className="h-14 w-12 text-2xl rounded-lg text-center" />
                  <InputOTPSlot index={3} className="h-14 w-12 text-2xl rounded-lg text-center" />
                  <InputOTPSlot index={4} className="h-14 w-12 text-2xl rounded-lg text-center" />
                  <InputOTPSlot index={5} className="h-14 w-12 text-2xl rounded-lg text-center" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              onClick={() => handleVerify()}
              className="mt-2 w-full max-w-sm bg-linear-to-r from-[#7b21e2] to-[#9d8cf4]"
              disabled={code.length !== 6}
            >
              Подтвердить
            </Button>
            <div className="text-sm text-muted-foreground">Не получили код? Проверьте папку спам.</div>
            <div className="text-sm">
              <Link
                href="/user/password-recovery"
                className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
              >
                Вернуться назад
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
