// import { ThemeToggle } from "@/components/theme-toggle";

// import UserAccount from "@/components/user-account";
// import FagarLogo from "@/components/fagarLogo";
// import SearchBar from "@/components/searchBar";
// import AddCorporation from "./AddCorporation";
// // import MapBoxApiKeyWrapper from "@/providers/map-box-apikey-wrapper";

// const Header = async () => {
//     const userId = {id: "1234", name:"Dev"};

//     // redirection vers le login si non connecté

//     return (
//       <div className="border-b">
//           {/* <div className="flex h-16 items-center px-4 mx-auto max-w-7xl"> */}
//           <div className="flex h-16 items-center px-4">
//             <FagarLogo />
//             <span className="text-lg font-medium text-baguet italic text-rose-600 ml-2">Fagar</span>
//             <div className="flex-1 flex justify-center">
//               <SearchBar />
//             </div>
//             <div className="ml-auto flex items-center space-x-4">
//               <AddCorporation />
//               <ThemeToggle />
//               <UserAccount 
//                 user={userId}
//               />
//             </div>
//           </div>
//       </div>
//     );
// }

// export default Header;
"use client";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import UserAccount from "@/components/user-account";
import FagarLogo from "@/components/fagarLogo";
import SearchBar from "@/components/searchBar";
import AddCorporation from "./AddCorporation";
import { Menu, X } from "lucide-react";
import MenuUnsignedUser from "./menu-unsigned";

const Header = () => {

    return (
        <div >
            <div className="">
              <div className="flex h-16 items-center px-4 border-b gap-4">
                    <div className="flex items-center px-4">
                        <FagarLogo />
                        <span className="text-lg font-medium text-baguet italic text-rose-600 ml-2">Fagar</span>
                    </div>
                    <div className="flex-1 justify-center hidden md:flex">
                        <SearchBar />
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <AddCorporation />
                            <ThemeToggle />
                            <MenuUnsignedUser />
                        </div>
                        <div className="md:hidden space-x-4">
                            <ThemeToggle />
                            <MenuUnsignedUser />
                        </div>
                    </div>
              </div>
              <div className="md:hidden m-5 flex justify-center">
                 <SearchBar  />
              </div>
            </div>
        </div>
    );
};

export default Header;

//<button onClick={toggleMenu} className="text-rose-600">
                              {/* <MenuUnsignedUser /> */}
                              {/* {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} */}
//</button>
// {menuOpen && (
//   <>
//      <div className="md:hidden px-4 pb-4">
//       {/* <div className="mt-4">
//         <SearchBar  />
//       </div> */}
//         <div className="mt-4 space-y-2">
//             <AddCorporation />
//             {/* <UserAccount user={userId} /> */}
//         </div>
//     </div>
//   </>
// )}
