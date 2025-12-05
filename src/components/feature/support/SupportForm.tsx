"use client";

import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Textarea } from "@/components/ui/common/Textarea";
import { Separator } from "@/components/ui/common/Separator";
import { supportFormSchema, TypeSupportFormSchema } from "@/schemas/support/support-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SupportForm() {
  const form = useForm<TypeSupportFormSchema>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(data: TypeSupportFormSchema) {
    // Здесь можно добавить логику отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    form.reset();
  }

  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquareIcon className="size-6 text-[#5e52cb]" />
            <CardTitle>Форма обратной связи</CardTitle>
          </div>
          <CardDescription>Заполните форму ниже, и мы свяжемся с вами как можно скорее</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <FormProvider {...form}>
            <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваше имя" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тема обращения</FormLabel>
                    <FormControl>
                      <Input placeholder="О чем ваше обращение?" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сообщение</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Опишите вашу проблему или вопрос..." {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-2 w-full bg-[#7b21e2]" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить сообщение"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
}
