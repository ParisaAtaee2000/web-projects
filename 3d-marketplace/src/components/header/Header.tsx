import { Brand } from "./Brand";
import { SearchBar } from "./SearchBar";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderActions } from "./HeaderActions";
import "./header.css";
export function Header() {
  return <header className="reference-header">
    <Brand /><SearchBar /><HeaderNavigation /><HeaderActions />
  </header>;
}
