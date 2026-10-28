import { useEffect, useState, type ReactNode } from "react";
import { ROUTES } from "./app/router/routeNames";
import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./pages/home/HomePage";
import { ProductsPage } from "./pages/products/ProductsPage";
import { ProductDetailsPage } from "./pages/product/ProductDetailsPage";
import { CategoriesPage } from "./pages/categories/CategoriesPage";
import { MakersPage } from "./pages/makers/MakersPage";
import { MakerProfilePage } from "./pages/maker/MakerProfilePage";
import { CustomOrdersPage } from "./pages/custom-orders/CustomOrdersPage";
import { Files3DPage } from "./pages/3d-files/Files3DPage";
import { PrintersPage } from "./pages/printers/PrintersPage";
import { MaterialsPage } from "./pages/materials/MaterialsPage";
import { AccessoriesPage } from "./pages/accessories/AccessoriesPage";
import { CartPage } from "./pages/cart/CartPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { AccountPage } from "./pages/account/AccountPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { SupportPage } from "./pages/info/SupportPage";
import { AboutPage } from "./pages/info/AboutPage";
import { ContactPage } from "./pages/info/ContactPage";
import { SellerDashboardPage } from "./pages/seller/SellerDashboardPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import "./components/catalog/extra-pages.css";

function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

function resolvePage(pathname: string): ReactNode {
  const path = normalizePath(pathname);

  if (path === ROUTES.home) return <HomePage />;
  if (path === ROUTES.products) return <ProductsPage />;
  if (/^\/products\/[^/]+$/.test(path)) return <ProductDetailsPage />;
  if (path === ROUTES.categories) return <CategoriesPage />;
  if (path === ROUTES.makers || path === "/seller") return <MakersPage />;
  if (/^\/makers\/[^/]+$/.test(path)) return <MakerProfilePage />;
  if (path === ROUTES.customOrders) return <CustomOrdersPage />;
  if (path === ROUTES.files3d) return <Files3DPage />;
  if (path === ROUTES.printers) return <PrintersPage />;
  if (path === ROUTES.materials) return <MaterialsPage />;
  if (path === ROUTES.accessories) return <AccessoriesPage />;
  if (path === ROUTES.cart) return <CartPage />;
  if (path === ROUTES.checkout) return <CheckoutPage />;
  if (path === ROUTES.accountMessages) return <MessagesPage />;
  if (path === ROUTES.account || path.startsWith(ROUTES.account + "/")) return <AccountPage />;
  if (path === ROUTES.login) return <LoginPage />;
  if (path === ROUTES.sellerDashboard) return <SellerDashboardPage />;
  if (path === ROUTES.support) return <SupportPage />;
  if (path === ROUTES.about) return <AboutPage />;
  if (path === ROUTES.contact) return <ContactPage />;
  if (path === ROUTES.register || path === "/signup" || path === ROUTES.sellerRegister) {
    return <SignupPage />;
  }

  return (
    <main className="page page--not-found">
      <h1>صفحه پیدا نشد</h1>
      <p>این نشانی در نسخهٔ فعلی Makerā تعریف نشده است.</p>
      <a href={ROUTES.home}>بازگشت به صفحهٔ اصلی</a>
    </main>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      if (
        destination.pathname === window.location.pathname &&
        destination.hash
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState(
        {},
        "",
        destination.pathname + destination.search + destination.hash,
      );
      setPathname(destination.pathname);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <AppShell showSidebar={normalizePath(pathname) === ROUTES.home}>
      {resolvePage(pathname)}
    </AppShell>
  );
}
