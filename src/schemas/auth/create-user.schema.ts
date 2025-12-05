import z from "zod";

export const createAccountSchema = z.object({
  email: z.string().min(5, "Email обязателен").pipe(z.email("Некорректный email")),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>;
