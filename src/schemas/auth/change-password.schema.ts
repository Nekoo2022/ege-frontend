import z from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Пароль должен быть не менее 8 символов"),
  newPassword: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

export type TypeChangePasswordSchema = z.infer<typeof changePasswordSchema>;

