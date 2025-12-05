import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/common/AlertDialog";
import { Button } from "@/components/ui/common/Button";
import { QueryResult } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, MessageSquare, KeyRound } from "lucide-react";
import {
  useDeactivateUserMutation,
  useGenerateDeactivateTokenByEmailMutation,
  useGenerateDeactivateTokenByTelegramMutation,
} from "@/graphql/generated/output";
import { useRouter } from "next/navigation";
import { DeactivateChannels } from "./DeactivateChannels";
import { ChannelDef, ChannelKey } from "./types/channels.types";
import { useCooldown } from "./useCooldown";
import { AuthenticatorInput } from "./AuthenticatorInput";
import { CodeInput } from "./CodeInput";

interface DeactivateDialogProps {
  isDeactivated: boolean;
  isTwoFactor: boolean;
  refetch: QueryResult["refetch"];
  telegramId: string | null;
}

//Диалоговое окно деактивации
export function DeactivateDialog({ isDeactivated, isTwoFactor, telegramId }: DeactivateDialogProps) {
  const [disabled, setDisabled] = useState(isDeactivated);
  const [channel, setChannel] = useState<"authenticator" | "email" | "telegram">("email");
  const [totp, setTotp] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const LAST_SEND_KEY = "deactivate_code_last_send";
  const CODE_LENGTH = 6;
  const { cooldown, start } = useCooldown(LAST_SEND_KEY);

  const channels: Record<ChannelKey, ChannelDef> = {
    email: { icon: Mail, label: "Email" },
    telegram: { icon: MessageSquare, label: "Telegram", disabled: !telegramId },
    authenticator: { icon: KeyRound, label: "Authenticator", disabled: !isTwoFactor },
  };

  const [generateTelegramToken, { loading: generatingTelegramToken }] =
    useGenerateDeactivateTokenByTelegramMutation({
      onCompleted() {
        toast.success("Токен успешно отправлен");
      },
      onError(error) {
        toast.error("Ошибка при отправке токена");
        console.log(error);
      },
    });

  const [generateEmailToken, { loading: generatingEmailToken }] = useGenerateDeactivateTokenByEmailMutation({
    onCompleted() {
      toast.success("Токен успешно отправлен");
    },
    onError(error) {
      toast.error("Ошибка при отправке токена");
      console.log(error);
    },
  });

  const [deactivateUser, { loading: deactivateUserLoading }] = useDeactivateUserMutation({
    onCompleted() {
      setDisabled(true);
      router.push("/");
      toast.success("Код успешно подтвержден. Аккаунт деактивирован");
    },
    onError(error) {
      toast.error("Неверный или просроченный код подтверждения");
      console.log(error);
    },
  });

  useEffect(() => {
    setCode("");
    setTotp("");
  }, [channel]);

  function handleConfirm() {
    switch (channel) {
      case "authenticator":
        deactivateUser({ variables: { data: { tokenValue: totp, channel } } });
        break;
      default:
        deactivateUser({ variables: { data: { tokenValue: code } } });
        break;
    }
  }

  function handleSendCode() {
    if (cooldown > 0) return;

    setCode("");
    if (channel === "telegram") {
      generateTelegramToken();
    }

    if (channel === "email") {
      generateEmailToken();
    }

    // устанавливаем новый кулдаун
    start();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="inline-flex items-center gap-2 shadow-sm" disabled={disabled}>
          Деактивировать
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="leading-tight text-center">
            Подтвердите деактивацию аккаунта
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            После деактивации вход станет недоступен. Через 7 дней аккаунт будет полностью удалён. До этого можно
            обратиться в поддержку для восстановления доступа.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <DeactivateChannels channels={channels} channel={channel} setChannel={setChannel} />

        {channel === "authenticator" && <AuthenticatorInput totp={totp} setTotp={setTotp} />}

        {channel !== "authenticator" && (
          <CodeInput
            code={code}
            setCode={setCode}
            handleSendCode={handleSendCode}
            cooldown={cooldown}
            generatingTelegramToken={generatingTelegramToken}
            channel={channel}
            telegramId={telegramId}
          />
        )}

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={deactivateUserLoading}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirm()}
            className="bg-destructive disabled:opacity-60"
            disabled={
              (channel === "authenticator" && totp.length !== CODE_LENGTH) ||
              (channel !== "authenticator" && code.length !== CODE_LENGTH) ||
              deactivateUserLoading ||
              generatingTelegramToken ||
              generatingEmailToken
            }
          >
            Подтвердить и деактивировать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
