"use client";

import { Plus } from 'lucide-react';
import { Button } from './ui/button';

import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useState } from 'react';

const AddCorporation = () => {
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    // Vous pouvez maintenant utiliser les valeurs query et address
    setOpen(false);
    storeModal.onOpen();
  };

  return (
    <div className="flex items-center border-2 rounded-full">

      <Button className="flex items-center rounded-full border-gray-300 px-4 py-2 text-sm" variant={'destructive'} onClick={handleClick}>
        <Plus size={15} />
          Ajouter votre entreprise
      </Button>
    </div>
  );
};

export default AddCorporation;
