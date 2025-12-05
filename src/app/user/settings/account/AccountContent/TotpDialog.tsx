import { Button } from "@/components/ui/common/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/common/Dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputTotp";
import { useGenerateTotpSecretMutation, useVerifyTotpMutation } from "@/graphql/generated/output";
import { useApolloClient } from "@apollo/client";
import { KeyRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QueryResult } from "@apollo/client";

interface TotpDialogProps {
  isTwoFactor: boolean;
  refetch: QueryResult["refetch"];
}

// модальное окно TOTP
export function TotpDialog({ isTwoFactor, refetch }: TotpDialogProps) {
  const [isTotpEnabled, setIsTotpEnabled] = useState(isTwoFactor);
  const [isOpen, setIsOpen] = useState(false);
  const [totp, setTotp] = useState("");
  const [qrcodeDataUrl, setQrcodeDataUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsTotpEnabled(isTwoFactor);
  }, [isTwoFactor]);

  const [generateTotpSecret] = useGenerateTotpSecretMutation({
    onCompleted(data) {
      setQrcodeDataUrl(data.GenerateTotpSecret);
    },
    onError(error) {
      toast.error("Ошибка при генерации TOTP QRCode");
      console.log(error);
    },
  });

  const [verifyTotp] = useVerifyTotpMutation({
    onCompleted(data) {
      console.log(data.VerifyTotp);
      if (data.VerifyTotp) {
        setIsTotpEnabled(true); // делаем кнопку disabled
        setIsOpen(false);
        toast.success("Двухфакторная авторизация подключена");
        refetch();
      } else {
        toast.error("Ошибка при подключении двухфакторной авторизации");
      }
    },
    onError(error) {
      toast.error("Ошибка при подключении двухфакторной авторизации");
      console.log(error);
    },
  });

  function handleGenerateTotpSecret() {
    generateTotpSecret();
  }

  function handleVarifyTotp() {
    if (totp.length === 6) {
      verifyTotp({ variables: { data: { token: totp } } });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => handleGenerateTotpSecret()}
          disabled={isTotpEnabled}
        >
          <KeyRound className="size-4" />
          Включить TOTP
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отсканируйте QRCode и введите 6-значный токен</DialogTitle>
          {qrcodeDataUrl && <Image className="mx-auto" src={qrcodeDataUrl} alt="qrcode" width={250} height={250} />}
        </DialogHeader>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 w-full">
          <div className="w-full flex justify-center">
            <InputOTP maxLength={6} className="w-full" value={totp} onChange={setTotp}>
              <InputOTPGroup className="flex w-full max-w-sm items-center justify-center gap-3">
                <InputOTPSlot index={0} className="h-14 w-12 text-2xl rounded-lg text-center" />
                <InputOTPSlot index={1} className="h-14 w-12 text-2xl rounded-lg text-center" />
                <InputOTPSlot index={2} className="h-14 w-12 text-2xl rounded-lg text-center" />
                <InputOTPSlot index={3} className="h-14 w-12 text-2xl rounded-lg text-center" />
                <InputOTPSlot index={4} className="h-14 w-12 text-2xl rounded-lg text-center" />
                <InputOTPSlot index={5} className="h-14 w-12 text-2xl rounded-lg text-center" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center justify-between w-full max-w-sm">
            <Button className="bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] w-full" onClick={handleVarifyTotp}>
              Подтвердить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
