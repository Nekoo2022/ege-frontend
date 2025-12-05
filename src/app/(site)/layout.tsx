import { PropsWithChildren } from "react";
import "@/styles/globals.css";
import { LayoutContainer } from "@/components/layout/LayoutContainer";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
export default function SiteLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full h-20 bg-card border-b border-border shadow-sm">
        <Header />
      </header>
      <div className="flex flex-1 mt-[100px]">
        <Sidebar />
        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </>
  );
}
