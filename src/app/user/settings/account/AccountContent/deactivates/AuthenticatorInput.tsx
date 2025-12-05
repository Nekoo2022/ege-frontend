import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputTotp";

interface AuthenticatorInputProps {
  totp: string;
  setTotp: (totp: string) => void;
}

//компонент для ввода кода из приложения-аутентификатора
export function AuthenticatorInput({ totp, setTotp }: AuthenticatorInputProps) {
  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-muted-foreground text-center">Введите 6-значный код из приложения-аутентификатора</p>
      <div className="w-full flex justify-center px-2">
        <InputOTP maxLength={6} value={totp} onChange={setTotp} className="w-full">
          <InputOTPGroup className="flex max-w-sm items-center justify-center gap-3">
            <InputOTPSlot index={0} className="h-12 w-10 text-xl rounded-lg text-center" />
            <InputOTPSlot index={1} className="h-12 w-10 text-xl rounded-lg text-center" />
            <InputOTPSlot index={2} className="h-12 w-10 text-xl rounded-lg text-center" />
            <InputOTPSlot index={3} className="h-12 w-10 text-xl rounded-lg text-center" />
            <InputOTPSlot index={4} className="h-12 w-10 text-xl rounded-lg text-center" />
            <InputOTPSlot index={5} className="h-12 w-10 text-xl rounded-lg text-center" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="text-xs text-muted-foreground text-center">Код обновляется каждые 30 секунд</div>
    </div>
  );
}
