import { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LikeCounter from '@/components/LikeCounter';
import { IUser } from '@/contexts/GlobalContext';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const replacePlusesWithSpaces = (query: string) => query.replaceAll('+', ' ');

const useSearch = (query: string) => {
  const [userResults, setUserResults] = useState<IUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function search() {
      try {
        if (query) {
          const res = await axios.post('/api/search', { query });
          if (res.data && res.data.users) {
            const users: IUser[] = res.data.users.map((user: any) => ({
              username: user.username,
              oneLink: user.oneLink,
              firstName: user.firstName,
              lastName: user.lastName,
              likes: new Set(user.likes),
              links: user.links,
            }));

            setUserResults(users);
            setError(null);
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
    search();
  }, [query]);

  return { userResults, error };
};

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;

  const { userResults, error } = useSearch(query as string);

  const formattedQuery = useMemo(
    () => (query ? replacePlusesWithSpaces(query as string) : ''),
    [query]
  );

  const renderResults = () => {
    if (!userResults) {
      return <div>...</div>;
    }
    if (!userResults.length) {
      return <div>There were no users matching the query.</div>;
    }

    return (
      <div>
        {userResults.map(({ username, oneLink, likes, links }) => (
          <Link href={`/l/${oneLink}`} key={username}>
            <a className="flex justify-between border-b-2 border-b-black p-4 hover:bg-black/10">
              <div className="flex items-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 font-sans text-2xl font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  {username[0]?.toUpperCase()}
                </div>
                <div className="mx-6 text-xl font-bold text-black">
                  {username}
                </div>
                <div className="text-sm text-black">{links.length} Links</div>
              </div>
              <LikeCounter likes={likes.size} blackText />
            </a>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Main
      meta={
        <Meta
          title={formattedQuery}
          description="Search for other users and their OneLinks."
        />
      }
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-center font-sans text-2xl font-bold text-white">
          Search Results - {`"${formattedQuery}"`}
        </h1>
      </div>
      <div className="container mt-2 rounded-lg bg-white px-7 py-5">
        <div>{renderResults()}</div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </Main>
  );
};

export default SearchResults;
