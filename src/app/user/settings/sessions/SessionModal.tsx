import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/common/Dialog";
import { FindCurrentSessionQuery } from "@/graphql/generated/output";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface SessionModalProps {
  session: FindCurrentSessionQuery["FindCurrentSession"];
}

export function SessionModal({ children, session }: PropsWithChildren<SessionModalProps>) {
  const center = [session.metadata.location.latidute, session.metadata.location.longitude];
  const createdAt = new Date(session.createdAt).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold">Информация о текущей сессии</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Устройство:{" "}
            <span className="font-light">
              {session.metadata.device.browser}, {session.metadata.device.os}
            </span>
          </p>
          <p className="text-lg font-medium">
            Местоположение:{" "}
            <span className="font-light">
              {session.metadata.location.country}, {session.metadata.location.city}
            </span>
          </p>
          <p className="text-lg font-medium">
            IP-адрес: <span className="font-light">{session.metadata.ip}</span>
          </p>
          <p className="text-lg font-medium">
            Дата создания: <span className="font-light">{createdAt}</span>
          </p>
          <YMaps>
            <div style={{ width: "100%", height: "300px" }}>
              <Map
                defaultState={{
                  center,
                  zoom: 11,
                }}
                width="100%"
                height="100%"
              >
                <Placemark geometry={center} />
              </Map>
            </div>
          </YMaps>
        </div>
      </DialogContent>
    </Dialog>
  );
}
