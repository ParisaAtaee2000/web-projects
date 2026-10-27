import { Brand } from "./Brand";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { MobileMenu } from "./MobileMenu";
import "./header.css";

export function Header() {
  return (
    <header className="reference-header">
      <Brand />
      <SearchBar />
      <HeaderActions />
      <MobileMenu />
    </header>
  );
}
