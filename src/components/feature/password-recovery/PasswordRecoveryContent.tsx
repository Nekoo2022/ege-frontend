"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { Separator } from "@/components/ui/common/Separator";
import { Button } from "@/components/ui/common/Button";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { useGeneratePasswordRecoveryTokenMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { passwordRecoverySchema, TypePasswordRecoverySchema } from "@/schemas/auth/password-recovery.schema";
import { useRouter } from "next/navigation";

export function PasswordRecoveryContent() {
  const router = useRouter();

  const form = useForm<TypePasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: "",
    },
  });

  const [generatePasswordRecoveryToken] = useGeneratePasswordRecoveryTokenMutation({
    onCompleted() {
      toast.success("Коды подтверждения успешно отправлены");
    },
    onError(error) {
      toast.error("Ошибка при отправке токенов");
      console.log(error);
    },
  });

  const { isValid } = form.formState;

  console.log(form.control._fields);

  function onSubmit(data: TypePasswordRecoverySchema) {
    router.push("/user/password-recovery/verify");
    localStorage.setItem("recovery_email", form.getValues("email"));
    generatePasswordRecoveryToken({ variables: { data } });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#f4f0ff] via-[#f7f7ff] to-[#eef2ff]">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center size-14 rounded-2xl bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow-md">
            <Mail className="size-7" />
          </div>
          <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
          <p className="text-sm text-muted-foreground">
            Введите ваш email, и мы отправим вам код подтверждения на почту и телеграм, если он у вас включен
          </p>
        </CardHeader>
        <Separator />
        <CardContent>
          <FormProvider {...form}>
            <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваш email</FormLabel>
                    <FormControl>
                      <Input placeholder="ivanov@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={!isValid} className="mt-2 w-full bg-linear-to-r from-[#7b21e2] to-[#9d8cf4]">
                Отправить инструкции
              </Button>
            </form>
          </FormProvider>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Не получили письмо? Проверьте папку спам.
          </div>
          <div className="mt-4 text-center text-sm">
            <Link
              href="/user/login"
              className="inline-flex items-center justify-center gap-1 bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="size-4" /> Вернуться ко входу
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
