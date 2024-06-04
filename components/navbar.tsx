import { ThemeToggle } from "@/components/theme-toggle";

import UserAccount from "@/components/user-account";
// import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";

const Navbar = async () => {
    const userId = {id: "1234", name:"Dev"};

    // redirection vers le login si non connecté

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserAccount 
                        user={userId}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;