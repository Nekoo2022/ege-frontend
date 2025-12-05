import { Button } from "@/components/ui/common/Button";
import { ChannelDef, ChannelKey } from "./types/channels.types";

interface DeactivateChannelsProps {
  channels: Record<ChannelKey, ChannelDef>;
  channel: ChannelKey;
  setChannel: (channel: ChannelKey) => void;
}

//компонент для выбора канала деактивации
export function DeactivateChannels({ channels, channel, setChannel }: DeactivateChannelsProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {Object.entries(channels).map(([key, { icon: Icon, label, disabled }]) => (
        <Button
          key={key}
          type="button"
          variant="secondary"
          onClick={() => setChannel(key as "authenticator" | "email" | "telegram")}
          disabled={disabled}
          className={`w-full inline-flex items-center justify-center gap-2 border ${
            channel === key
              ? "bg-linear-to-r from-[#7b21e2] to-[#9d8cf4] text-white hover:from-[#6b1bd0] hover:to-[#8d7ce4] border-transparent"
              : ""
          }`}
        >
          <Icon className="size-4" /> {label}
        </Button>
      ))}
    </div>
  );
}
