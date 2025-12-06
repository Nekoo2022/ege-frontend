"use client";

import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Separator } from "@/components/ui/common/Separator";
import { useChangeEmailMutation, useFindMeQuery } from "@/graphql/generated/output";
import { changeEmailSchema, TypeChangeEmailSchema } from "@/schemas/auth/change-email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangeEmailForm() {
  const { data: userData, refetch } = useFindMeQuery();

  const form = useForm<TypeChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: userData?.FindMe.user?.email || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Обновляем форму когда данные пользователя загружены
  useEffect(() => {
    if (userData?.FindMe?.user?.email) {
      form.reset({ email: userData.FindMe.user?.email });
    }
  }, [userData, form]);

  const { isValid, isSubmitting } = form.formState;

  const [changeEmail, { loading: isLoadingChangeEmail }] = useChangeEmailMutation({
    onCompleted() {
      toast.success("Email успешно изменен");
      refetch();
    },
    onError(error) {
      console.log(error);
      toast.error("Ошибка при изменении email");
    },
  });

  async function onSubmit(data: TypeChangeEmailSchema) {
    if (data.email === userData?.FindMe?.user?.email) {
      toast.info("Новый email совпадает с текущим");
      return;
    }

    await changeEmail({
      variables: {
        email: data.email,
      },
    });
  }

  const isLoading = isLoadingChangeEmail || isSubmitting;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <MailIcon className="size-6 text-[#5e52cb]" />
          <CardTitle>Изменить email</CardTitle>
        </div>
        <CardDescription>Введите новый email адрес</CardDescription>
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
                  <FormLabel>Новый email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="new.email@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 w-full bg-[#7b21e2] text-white"
              disabled={!isValid || isLoading || userData?.FindMe?.user?.email === form.watch("email")}
            >
              {isLoading ? "Изменение..." : "Изменить email"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
