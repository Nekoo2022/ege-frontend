import { Button } from "@/components/ui/common/Button";
import { Input } from "@/components/ui/common/Input";
import { Send, Timer } from "lucide-react";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  handleSendCode: () => void;
  cooldown: number;
  generatingTelegramToken: boolean;
  channel: "email" | "telegram";
  telegramId: string | null;
}

//компонент для ввода кода подтверждения
export function CodeInput({
  code,
  setCode,
  handleSendCode,
  cooldown,
  generatingTelegramToken,
  channel,
  telegramId,
}: CodeInputProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Введите 6-значный код"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        />
        <Button
          type="button"
          variant="secondary"
          className="inline-flex items-center gap-2"
          onClick={handleSendCode}
          disabled={cooldown > 0 || generatingTelegramToken || (channel === "telegram" && !telegramId)}
        >
          {cooldown > 0 ? (
            <>
              <Timer className="size-4" /> Отправить повторно через {cooldown} с
            </>
          ) : (
            <>
              <Send className="size-4" /> Отправить код
            </>
          )}
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">Код будет действителен в течение ограниченного времени</div>
    </div>
  );
}
