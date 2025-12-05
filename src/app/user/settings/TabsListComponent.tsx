import { TabsList, TabsTrigger } from "@/components/ui/common/Tabs";
import { User, Palette, Shield, MonitorSmartphone } from "lucide-react";

export function TabsListComponent() {
  return (
    <TabsList className="mt-4 w-full overflow-x-auto rounded-md border bg-card/60 backdrop-blur p-0 shadow-sm flex gap-1 h-[50px]">
      {/* <TabsTrigger
        value="profile"
        className="group inline-flex items-center gap-2 px-3 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent h-[calc(100%-1px)]"
      >
        <User className="size-4 opacity-70 group-data-[state=active]:opacity-100" />
        Профиль
      </TabsTrigger> */}
      <TabsTrigger
        value="account"
        className="group inline-flex items-center gap-2 px-3 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent h-[calc(100%-1px)]"
      >
        <Palette className="size-4 opacity-70 group-data-[state=active]:opacity-100" />
        Аккаунт
      </TabsTrigger>
      {/* <TabsTrigger
        value="security"
        className="group inline-flex items-center gap-2 px-3 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent h-[calc(100%-1px)]"
      >
        <Shield className="size-4 opacity-70 group-data-[state=active]:opacity-100" />
        Безопасность
      </TabsTrigger> */}
      <TabsTrigger
        value="session"
        className="group inline-flex items-center gap-2 px-3 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent h-[calc(100%-1px)]"
      >
        <MonitorSmartphone className="size-4 opacity-70 group-data-[state=active]:opacity-100" />
        Сессии
      </TabsTrigger>
    </TabsList>
  );
}
