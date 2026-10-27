import type { PropsWithChildren } from "react";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import "./app-shell.css";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell" dir="ltr">
      <Header />
      <div className="app-shell__body">
        <Sidebar />
        <main className="app-shell__main" dir="rtl">{children}</main>
      </div>
    </div>
  );
}
