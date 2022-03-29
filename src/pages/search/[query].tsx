import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import LikeCounter from '@/components/LikeCounter';
import { IUser } from '@/contexts/GlobalContext';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

interface IUserResult extends IUser {
  likes: number;
  links: number;
}

const replacePlusesWithSpaces = (query: string) => query.replaceAll('+', ' ');

const useSearch = (query: string) => {
  const [userResults, setUserResults] = useState<IUserResult[] | null>(null);

  useEffect(() => {
    if (query) {
      // const res = await axios.post('/api/search', { query: replacePlusesWithSpaces(query) });
      const res = {
        data: {
          results: [
            {
              username: 'willsmith',
              linkName: 'will',
              likes: 10,
              links: 2,
            },
            {
              username: 'chrisrock',
              linkName: 'chris',
              likes: 15,
              links: 6,
            },
          ],
        },
      };

      const { results } = res.data;
      setUserResults(results);
    }
  }, [query]);

  return { userResults };
};

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;

  const { userResults } = useSearch(query as string);

  const formattedQuery = useMemo(
    () => (query ? replacePlusesWithSpaces(query as string) : ''),
    [query]
  );

  const renderResults = () =>
    userResults ? (
      <div>
        {userResults.map(({ username, linkName, likes, links }) => (
          <Link href={`/l/${linkName}`} key={username}>
            <a className="flex justify-between border-b-2 border-b-black p-4 hover:bg-black/10">
              <div className="flex items-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 font-sans text-2xl font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  {username[0]?.toUpperCase()}
                </div>
                <div className="mx-6 text-xl font-bold text-black">
                  {username}
                </div>
                <div className="text-sm text-black">{links} Links</div>
              </div>
              <LikeCounter likes={likes} blackText />
            </a>
          </Link>
        ))}
      </div>
    ) : (
      <div>...</div>
    );

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
      </div>
    </Main>
  );
};

export default SearchResults;
