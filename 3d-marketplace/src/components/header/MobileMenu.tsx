import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarMenu } from "../sidebar/SidebarMenu";
import { SellerCard } from "../sidebar/SellerCard";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > 760) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      if (window.innerWidth <= 760) toggleRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="mobile-menu-toggle"
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="بستن منو"
            onClick={() => setIsOpen(false)}
          />
          <div
            id={menuId}
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="ناوبری سایت"
            dir="rtl"
          >
            <div className="mobile-menu-panel__header">
              <span>ناوبری اصلی</span>
              <button
                ref={closeRef}
                type="button"
                className="mobile-menu-panel__close"
                onClick={() => setIsOpen(false)}
              >
                <X size={17} aria-hidden="true" />
                <span>بستن</span>
              </button>
            </div>
            <SidebarMenu includeHome />
            <SellerCard />
          </div>
        </>
      )}
    </>
  );
}
