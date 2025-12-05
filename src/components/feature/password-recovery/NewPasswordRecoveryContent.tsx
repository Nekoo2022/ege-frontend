"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Separator } from "@/components/ui/common/Separator";
import { Input } from "@/components/ui/common/Input";
import { Button } from "@/components/ui/common/Button";
import Link from "next/link";
import { Lock } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import {
  newPasswordRecoverySchema,
  type TypeNewPasswordRecoverySchema,
} from "@/schemas/auth/new-password-recovery.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordRecoveryMutation } from "@/graphql/generated/output";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";

export function NewPasswordRecoveryContent() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  const [changePasswordRecovery] = useChangePasswordRecoveryMutation({
    onCompleted() {
      localStorage.removeItem("email");
      router.push("/user/login");
      toast.success("Пароль успешно изменен");
    },
    onError(error) {
      toast.error("Ошибка при изменении пароля");
      console.log(error);
    },
  });

  useEffect(() => {
    setEmail(localStorage.getItem("recovery_email"));
  }, []);

  const form = useForm<TypeNewPasswordRecoverySchema>({
    resolver: zodResolver(newPasswordRecoverySchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit() {
    if (email) changePasswordRecovery({ variables: { data: { email, newPassword: form.getValues("password") } } });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#f4f0ff] via-[#f7f7ff] to-[#eef2ff]">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md">
            <Lock className="size-7" />
          </div>
          <CardTitle className="text-2xl">Создание нового пароля</CardTitle>
          <p className="text-sm text-muted-foreground">Придумайте надежный пароль и подтвердите его ниже</p>
        </CardHeader>
        <Separator />
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4 py-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Новый пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Введите новый пароль" {...field} />
                    </FormControl>
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Подтвердите пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Повторите пароль" {...field} />
                    </FormControl>
                    {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />

              <div className="text-xs text-muted-foreground">
                Минимум 8 символов. Используйте буквы верхнего и нижнего регистров, цифры и спецсимволы.
              </div>

              <Button type="submit" className="mt-2 w-full bg-linear-to-r from-[#7b21e2] to-[#9d8cf4]">
                {"Сохранить пароль"}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/user/password-recovery/verify"
                  className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                >
                  Вернуться назад
                </Link>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
