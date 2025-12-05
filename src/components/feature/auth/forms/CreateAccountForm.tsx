"use client";

import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Separator } from "@/components/ui/common/Separator";
import { useCreateUserMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";
import { createAccountSchema, TypeCreateAccountSchema } from "@/schemas/auth/create-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

export default function CreateAccountForm() {
  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // проверка при изменении полей
    reValidateMode: "onChange", // повторная валидация при изменении
  });

  const { isValid } = form.formState;

  const router = useRouter();

  const { auth } = useAuth();

  const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted() {
      toast.success("Аккаунт успешно создан");
      router.push("/");
    },
    onError(error) {
      console.log(error);
      toast.error("Ошибка при создании аккаунта");
    },
  });

  function onSubmit(data: TypeCreateAccountSchema) {
    create({
      variables: {
        data,
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#f4f0ff] via-[#f7f7ff] to-[#eef2ff]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Создание аккаунта</CardTitle>
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
                      <Input placeholder="ivanov@gmail.com" {...field} disabled={isLoadingCreate} />
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
                      <Input placeholder="********" {...field} type="password" disabled={isLoadingCreate} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-2 w-full bg-[#7b21e2]" disabled={!isValid || isLoadingCreate}>
                Создать Аккаунт
              </Button>
            </form>
            <div className="mt-3 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?
              <Link href="/user/login" className="ml-1 inline-flex items-center">
                <span className="inline-flex items-center gap-1 bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                  Войти <LogIn className="size-4" />
                </span>
              </Link>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
