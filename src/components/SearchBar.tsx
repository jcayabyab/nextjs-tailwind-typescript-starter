import React, { FormEvent, useState } from 'react';

import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const mapWhitespaceToPluses = (query: string) =>
  query.replace(/\s/g, '+').replace(/[^A-Za-z0-9+]/g, '');

export default function SearchBar() {
  const [queryInput, setQueryInput] = useState('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (queryInput) {
      router.push(`/search/${mapWhitespaceToPluses(queryInput)}`);
      setQueryInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-1 items-center rounded-full border-2 border-black py-1 pl-0.5 pr-1"
    >
      <input
        className="min-w-0 flex-1 border-0 bg-transparent px-4 focus:outline-0 focus:ring-0"
        type="text"
        value={queryInput}
        onChange={(event) => setQueryInput(event.currentTarget.value)}
        placeholder="Search"
      />
      <button type="submit" className="mr-2 p-2 hover:text-black">
        <SearchIcon className="h-7 w-7" />
      </button>
    </form>
  );
}
