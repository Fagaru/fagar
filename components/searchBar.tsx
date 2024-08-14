"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Replace, Search, X } from 'lucide-react';
import { useRouter, useSearchParams,usePathname } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname=usePathname();
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');
  const {replace} = useRouter();
  const router = useRouter();
  const params=new URLSearchParams(searchParams)

  const handleQueryChange = (searchTerm: string) => {
    if(searchTerm){
      setQuery(searchTerm);
      params.set("query",searchTerm);
    }else{
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    
  };

  const handleAddressChange = (e: string) => {
    setAddress(e);
  };
  

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof query !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(query);
    router.push(`/search?query=${encodedSearchQuery}`);
  };

  // const clearQuery = () => {
  //   setQuery('');
  // };

  const clearAddress = () => {
    setAddress('');
  };
  // console.log(query)
  return (
    <div className="flex items-center border-2 rounded-full">
      <div className="flex items-center relative">
        <Input
          type="text"
          className="rounded-l-full border-gray-300"
          placeholder="De quoi avez-vous besoin ?"
          defaultValue={searchParams.get('query')?.toString()}
          size={50}
          // value={query}
          onChange={(e)=>{
            handleQueryChange(e.target.value);
          }}
        />
        {/* {query && (
          <button onClick={clearQuery} className="absolute right-0 mr-2">
            <X size={15} opacity={0.55}/>
          </button>
        )} */}
      </div>
      <div className="flex items-center relative">
        <Input
          type="text"
          className="rounded-none border-gray-300"
          placeholder="Votre adresse"
          size={50}
          value={address}
          onChange={(e)=>{
            handleAddressChange(e.target.value);
          }}
        />
        {address && (
          <button onClick={clearAddress} className="absolute right-0 mr-2">
            <X size={15} opacity={0.55}/>
          </button>
        )}
      </div>
      <button className="rounded-r-full border-gray-300 px-4 py-2 max-w-3" onClick={handleSearch}>
        <Search />
      </button>
    </div>
  );
};
  
export default SearchBar;
