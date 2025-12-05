import { FindCurrentSessionQuery, useRemoveSessionMutation } from "@/graphql/generated/output";
import { getBrowserIcon } from "@/utils/get-browser-icon";
import { SessionModal } from "./SessionModal";
import { Button } from "@/components/ui/common/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card";
import { MapPin, Globe, Clock, Power, ShieldCheck } from "lucide-react";
import { SessionRemoveDialog } from "./SessionRemoveDialog";

interface SessionItemProps {
  session: FindCurrentSessionQuery["FindCurrentSession"];
  isCurrent?: boolean;
  refetch?: (vars?: any) => Promise<any> | any;
}

export function SessionItem({ session, isCurrent, refetch }: SessionItemProps) {
  const Icon = getBrowserIcon(session.metadata.device.browser);
  const createdAt = new Date(session.createdAt).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const [removeSession] = useRemoveSessionMutation();

  async function handleRemoveSession() {
    if (refetch) {
      removeSession({ variables: { id: session.id } });
      await refetch();
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center size-12 rounded-full bg-linear-to-br from-[#7b21e2] to-[#9d8cf4] text-white shadow">
          <Icon className="size-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2">
            {session.metadata.device.browser}
            {isCurrent && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 text-xs">
                <ShieldCheck className="size-3" /> Текущая
              </span>
            )}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs">
              {session.metadata.device.os}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="size-3" /> {session.metadata.ip}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {createdAt}
            </span>
          </CardDescription>
        </div>
        <div className="[data-slot=card-action] flex items-center gap-2">
          <SessionModal session={session}>
            <Button variant="outline">Подробнее</Button>
          </SessionModal>
          {!isCurrent && <SessionRemoveDialog isCurrent={isCurrent!} handleRemoveSession={handleRemoveSession} />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" /> {session.metadata.location.country}, {session.metadata.location.city}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
