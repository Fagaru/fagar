"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search query:', query);
    console.log('Address:', address);
    // Vous pouvez maintenant utiliser les valeurs query et address
  };

  const clearQuery = () => {
    setQuery('');
  };

  const clearAddress = () => {
    setAddress('');
  };

  return (
    <div className="flex items-center border-2 rounded-full">
      <div className="flex items-center relative">
        <Input
          type="text"
          className="rounded-l-full border-gray-300"
          placeholder="De quoi avez-vous besoin ?"
          value={query}
          onChange={handleQueryChange}
        />
        {query && (
          <button onClick={clearQuery} className="absolute right-0 mr-2">
            <X size={15} opacity={0.55}/>
          </button>
        )}
      </div>
      <div className="flex items-center relative">
        <Input
          type="text"
          className="rounded-none border-gray-300"
          placeholder="Votre adresse"
          value={address}
          onChange={handleAddressChange}
        />
        {address && (
          <button onClick={clearAddress} className="absolute right-0 mr-2">
            <X size={15} opacity={0.55}/>
          </button>
        )}
      </div>
      <button className="rounded-r-full border-gray-300 px-4 py-2" onClick={handleSearch}>
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
