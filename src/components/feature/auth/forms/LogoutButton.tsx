"use client";

import { Button } from "@/components/ui/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation } from "@/graphql/generated/output";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApolloClient } from "@apollo/client";

export default function LogoutButton() {
  const { exit, refetch } = useAuth();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [logout, { loading: isLoadingLogout }] = useLogoutMutation({
    async onCompleted() {
      // Сначала выходим и обновляем состояние
      // Очищаем кэш Apollo Client (в try/catch, чтобы не падать из-за ошибок)
      try {
        await apolloClient.clearStore();
      } catch (err) {
        console.error("Failed to clear Apollo cache on logout:", err);
      }
      // Небольшая задержка, чтобы сервер успел обработать выход
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Обновляем локальное состояние
      exit();

      // Принудительно обновляем запрос сессии с сервера
      // Важно: даже если сервер вернет старые данные, мы уже установили exit()
      try {
        Object.keys(localStorage).forEach((key) => localStorage.removeItem(key));
        await refetch();
      } catch (e) {
        // Игнорируем ошибки при обновлении - главное что мы уже вышли
        console.log("Error refetching session:", e);
      }

      toast.success("Вы успешно вышли");
      // Используем replace вместо push, чтобы избежать истории
      router.replace("/");
    },
    onError(error: unknown) {
      console.log(error);
      toast.error("Ошибка при выходе");
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      variant="outline"
      className="border-border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
      onClick={handleLogout}
      disabled={isLoadingLogout}
    >
      {isLoadingLogout ? "Выход..." : "Выйти"}
    </Button>
  );
}
