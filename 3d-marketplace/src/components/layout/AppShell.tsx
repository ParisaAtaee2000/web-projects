import type { PropsWithChildren } from "react";
import { Header } from "../header/Header";
import { SiteFooter } from "../footer/SiteFooter";
import "./app-shell.css";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell" dir="ltr">
      <Header />
      <div className="app-shell__body">
        <main className="app-shell__main" dir="rtl">
          {children}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
