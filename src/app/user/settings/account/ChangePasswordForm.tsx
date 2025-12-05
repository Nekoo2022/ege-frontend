"use client";

import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Separator } from "@/components/ui/common/Separator";
import { useChangePasswordMutation } from "@/graphql/generated/output";
import { changePasswordSchema, TypeChangePasswordSchema } from "@/schemas/auth/change-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const form = useForm<TypeChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isValid, isSubmitting } = form.formState;

  const [changePassword, { loading: isLoadingChangePassword }] = useChangePasswordMutation({
    onCompleted() {
      toast.success("Пароль успешно изменен");
      form.reset();
    },
    onError(error) {
      console.log(error);
      toast.error("Ошибка при изменении пароля. Проверьте старый пароль.");
    },
  });

  async function onSubmit(data: TypeChangePasswordSchema) {
    if (data.oldPassword === data.newPassword) {
      toast.error("Новый пароль должен отличаться от старого");
      return;
    }

    await changePassword({
      variables: {
        data: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      },
    });
  }

  const isLoading = isLoadingChangePassword || isSubmitting;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <LockIcon className="size-6 text-[#5e52cb]" />
          <CardTitle>Изменить пароль</CardTitle>
        </div>
        <CardDescription>Введите текущий и новый пароль</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <FormProvider {...form}>
          <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Текущий пароль</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Введите текущий пароль" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Введите новый пароль" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full bg-[#7b21e2] text-white" disabled={!isValid || isLoading}>
              {isLoading ? "Изменение..." : "Изменить пароль"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
