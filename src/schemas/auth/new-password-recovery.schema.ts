import z from "zod";

export const newPasswordRecoverySchema = z
  .object({
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(8, "Минимум 8 символов"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "Пароли не совпадают",
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });

export type TypeNewPasswordRecoverySchema = z.infer<typeof newPasswordRecoverySchema>;
