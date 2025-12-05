"use client";

import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputTotp";
import { Separator } from "@/components/ui/common/Separator";
import {
  useChangePasswordRecoveryMutation,
  useFindMeQuery,
  useGeneratePasswordRecoveryTokenMutation,
  useLoginMutation,
  useLoginTotpMutation,
} from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, TypeLoginSchema } from "@/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginAccountForm() {
  const [step, setStep] = useState<"login" | "totp">("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [totp, setTotp] = useState("");

  const router = useRouter();

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // проверка при изменении полей
    reValidateMode: "onChange", // повторная валидация при изменении
  });

  const { isValid } = form.formState;

  const { refetch } = useAuth();

  const [loginTotp, { loading: isLoadingLoginTotp }] = useLoginTotpMutation({
    async onCompleted() {
      await refetch();
      toast.success("Двухфакторная авторизация успешна!");
      router.push("/");
    },
    onError() {
      toast.error("Неверный код, попробуйте ещё раз");
      setTotp("");
    },
  });

  const [login, { loading: isLoadingLogin }] = useLoginMutation({
    async onCompleted(data) {
      const res = data.Login;
      if (res.success) {
        await refetch();
        toast.success("Вы успешно вошли");
        router.push("/");
      }

      if (res.message) {
        toast.error(res.message);
      }

      if (res.requireTotp && res.userId) {
        setUserId(res.userId);
        setStep("totp");
        toast.info(data.Login.message);
      }
    },
    onError(error) {
      console.log(error);
      toast.error("Ошибка при входе");
    },
  });

  function onSubmit(data: TypeLoginSchema) {
    login({
      variables: {
        data,
      },
    });
  }

  function onSubmitTotp() {
    if (!userId || totp.length !== 6 || isLoadingLoginTotp) return;
    loginTotp({
      variables: {
        data: { userId, token: totp },
      },
    });
  }

  useEffect(() => {
    if (totp.length === 6) onSubmitTotp();
  }, [totp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#f4f0ff] via-[#f7f7ff] to-[#eef2ff]">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center space-y-2">
          {step === "login" ? (
            <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md">
                <ShieldCheck className="size-7" />
              </div>
              <CardTitle className="text-2xl">Подтверждение входа</CardTitle>
              <p className="text-sm text-muted-foreground">Введите 6-значный код из приложения-аутентификатора</p>
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent>
          {step === "login" ? (
            <FormProvider {...form}>
              <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваш email</FormLabel>
                      <FormControl>
                        <Input placeholder="ivanov@gmail.com" {...field} disabled={isLoadingLogin} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваш пароль</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} type="password" disabled={isLoadingLogin} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="-mt-1 mb-1 text-right">
                  <Link
                    href="/user/password-recovery"
                    // onClick={() => generatePasswordRecoveryToken({ variables: { data: { email: email! } } })}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Button
                  className="mt-2 w-full bg-linear-to-r from-[#7b21e2] to-[#9d8cf4]"
                  disabled={!isValid || isLoadingLogin}
                >
                  Войти в аккаунт
                </Button>
              </form>
              <div className="mt-3 text-center text-sm text-muted-foreground">
                Нет аккаунта?
                <Link href="/user/create" className="ml-1 inline-flex items-center">
                  <span className="inline-flex items-center gap-1 bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                    Создать аккаунт <UserPlus className="size-4" />
                  </span>
                </Link>
              </div>
            </FormProvider>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 w-full">
              <div className="w-full flex justify-center">
                <InputOTP
                  maxLength={6}
                  disabled={isLoadingLoginTotp}
                  className="w-full"
                  value={totp}
                  onChange={setTotp}
                >
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

              <div className="flex items-center justify-between w-full max-w-sm">
                <Button
                  className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] w-full"
                  disabled={isLoadingLoginTotp || totp.length !== 6}
                  onClick={onSubmitTotp}
                >
                  Подтвердить
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
