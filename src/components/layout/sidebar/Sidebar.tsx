"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarMenu } from "./SidebarMenu";
import { accountMenuItems, mainMenuItems } from "./SidebarMenuItems";

interface SidebarProps {
  isAccountSettings?: true;
}

export default function Sidebar({ isAccountSettings }: SidebarProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<string>("profile");

  return (
    <div className="fixed left-0 top-[100px] bottom-6 w-72 ml-6 mt-1">
      <div className="flex flex-col gap-2">
        <div className="px-3 mb-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Навигация</h2>
        </div>
      </div>
      {isAccountSettings ? (
        <SidebarMenu items={accountMenuItems} isAccountMenu activeValue={isActive} setActiveValue={setIsActive} />
      ) : (
        <SidebarMenu items={mainMenuItems} pathname={pathname} />
      )}
    </div>
  );
}
