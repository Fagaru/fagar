// Page 2 - SetLocation.tsx
"use client"

import React from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SetLocationApiKeyWrapperProps } from "@/components/setLocation-apiLoader";

export const SetLocation: React.FC<SetLocationApiKeyWrapperProps> = ({ setNewAddress }) => {
  const placeholder: string = "Entrer votre nouvelle adresse";

  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      color: 'white', // Set the text color to white
    }),
  };

  return (
    <div className="m-1 dark:text-black">
        
      <GooglePlacesAutocomplete
        selectProps={{
          onChange: (place: any) => { setNewAddress(place) },
          placeholder: placeholder,
          isClearable: true,
          className: 'p-1 border-[1px] rounded-lg w-[510px]',
          components: {
            DropdownIndicator: null,
          },
          styles: {
            control: (provided: any) => ({
              ...provided,
              backgroundColor: '',
              border: 'none',
              innerWidth: '500px',
              width: '500px',
              text: '[30px]',
            }),
          },
        //   ...customStyles
        }}
      />
    </div>
  );
};
