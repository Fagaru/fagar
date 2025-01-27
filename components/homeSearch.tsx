"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import ErrorFallback from "@/components/errorFallback";
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from "react";
import Loader from "@/components/loader";

const HomeSearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const { replace } = useRouter();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleQueryChange = (searchTerm: string) => {
    if (searchTerm) {
      setQuery(searchTerm);
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof query !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(query);
    router.push(`/search?query=${encodedSearchQuery}`);
  };

  return (
    <div className="flex items-center ">
      <button
        className="rounded-full p-3 bg-white text-gray-800 shadow-sm hover:bg-gray-100 flex items-center justify-center" // Ajout du bg-white et rounded-full
        onClick={handleSearch}
      >
        <Search size={15} />
      </button>
      <div className="flex items-center relative">
        <Input
          type="text"
          className="rounded-l-lg rounded-r-none px-4 py-2 h-9 w-80"
          placeholder="De quoi avez-vous besoin ?"
          defaultValue={searchParams.get('query')?.toString()}
          size={50}
          onChange={(e) => {
            handleQueryChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};




// Envelopper AuthPage avec Suspense et ErrorBoundary
export default function WrappedHomeSearchBar() {
  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
              <HomeSearchBar />
          </Suspense>
      </ErrorBoundary>
  );
}