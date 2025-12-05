import { PropsWithChildren } from "react";

export function LayoutContainer({ children }: PropsWithChildren) {
  return <main className="flex-1 overflow-y-auto ml-[312px] p-6 pt-0">{children}</main>;
}
