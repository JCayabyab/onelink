import React, { FormEvent, useState } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const mapWhitespaceToPluses = (query: string) => query.replaceAll(/\s/g, '+');

export default function SearchBar() {
  const [queryInput, setQueryInput] = useState('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (queryInput) {
      router.push(mapWhitespaceToPluses(queryInput));
      setQueryInput('');
    }
  };

  return (
    <div className="rounded-full border-2 border-black py-1 pl-0.5 pr-1">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          className="border-0 bg-transparent px-4 focus:outline-0 focus:ring-0"
          type="text"
          value={queryInput}
          onChange={(event) => setQueryInput(event.currentTarget.value)}
          placeholder="Search"
        />
        <button type="submit" className="p-2 hover:text-black">
          <SearchIcon className="mr-2 h-7 w-7" />
        </button>
      </form>
    </div>
  );
}
