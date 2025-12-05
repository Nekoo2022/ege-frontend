import z from "zod";

export const supportFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  email: z.string().min(5, "Email обязателен").pipe(z.email("Некорректный email")),
  subject: z.string().min(3, "Тема должна содержать не менее 3 символов"),
  message: z.string().min(10, "Сообщение должно содержать не менее 10 символов"),
});

export type TypeSupportFormSchema = z.infer<typeof supportFormSchema>;

