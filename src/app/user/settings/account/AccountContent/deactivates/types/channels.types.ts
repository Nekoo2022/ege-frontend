export type ChannelKey = "email" | "telegram" | "authenticator";

export type ChannelDef = {
  icon: React.ComponentType<any>;
  label: string;
  disabled?: boolean;
};
