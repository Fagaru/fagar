"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {  
    AlignRight,
    LifeBuoy, 
    LogIn, 
    Menu,
    Paperclip
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AddCorporation from "@/components/AddCorporation";
import LogoutButton from "@/components/logoutButton";
import { useUser } from "@/context/userContext";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface MenuProps extends PopoverTriggerProps {
    // user: any;
};

export default function MenuUnsignedUser({

}: MenuProps) {
    const { user, logout, isAuthenticated } = useUser();
    // const storeModal = useStoreModal();
    // const params = useParams();
    // const router = useRouter();

    // const [open, setOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <AlignRight className="h-6 w-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    { isAuthenticated ?
                        <DropdownMenuItem>
                        <LogoutButton content="" />
                        </DropdownMenuItem>
                        :
                        <>
                            <DropdownMenuItem >
                                <Link  
                                    key='/login'
                                    href='/login'
                                    className="flex align-items"
                                    >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    <span>Connexion</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link  
                                    key='/register'
                                    href='/register'
                                    className="flex align-items"
                                    >
                                    <Paperclip className="mr-2 h-4 w-4" />
                                    <span>Inscription</span>
                                </Link>
                            </DropdownMenuItem>
                        </>
                    }
                    <DropdownMenuSeparator />
                    { (isAuthenticated && user.role === "admin") ?
                        <></>
                    :
                        <DropdownMenuItem>
                            <AddCorporation />
                        </DropdownMenuItem>
                    }
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};