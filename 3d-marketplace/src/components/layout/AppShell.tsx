import type { PropsWithChildren } from "react";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { SiteFooter } from "../footer/SiteFooter";
import "./app-shell.css";

interface AppShellProps extends PropsWithChildren {
  showSidebar?: boolean;
}

export function AppShell({ children, showSidebar = false }: AppShellProps) {
  return (
    <div
      className={showSidebar ? "app-shell app-shell--with-sidebar" : "app-shell"}
      dir="ltr"
    >
      <Header />
      <div
        className={
          showSidebar
            ? "app-shell__body app-shell__body--with-sidebar"
            : "app-shell__body"
        }
      >
        {showSidebar && <Sidebar />}
        <main className="app-shell__main" dir="rtl">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
