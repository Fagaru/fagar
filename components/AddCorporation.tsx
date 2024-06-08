"use client";

import { Plus } from 'lucide-react';
import { Button } from './ui/button';

const AddCorporation = () => {
  const handleClick = () => {
    // Vous pouvez maintenant utiliser les valeurs query et address
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
