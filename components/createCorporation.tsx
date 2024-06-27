"use client";

import { useEffect, useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";

const CreateCorporation = () =>  {
    const storeModal = useStoreModal();
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    return (
        <>
            <span
                onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                }}
            >
                <Lock className="mr-2 h-5 w-5" />
                Create Store 
            </span>
                        </>
    )
}

export default CreateCorporation;
