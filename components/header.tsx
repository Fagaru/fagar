import { ThemeToggle } from "@/components/theme-toggle";

import UserAccount from "@/components/user-account";
import FagarLogo from "@/components/fagarLogo";
import SearchBar from "@/components/searchBar";
import AddCorporation from "./AddCorporation";
// import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";

const Header = async () => {
    const userId = {id: "1234", name:"Dev"};

    // redirection vers le login si non connecté

    return (
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <FagarLogo />
            <span className="text-lg font-medium text-baguet italic text-rose-600 ml-2">Fagar</span>
            <div className="flex-1 flex justify-center">
              <SearchBar />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <AddCorporation />
              <ThemeToggle />
              <UserAccount 
                user={userId}
              />
            </div>
          </div>
      </div>
    );
}

export default Header;