import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

interface ILink {
  label: string;
  link: string;
}

const useLinks = (username: string | undefined) => {
  const [links, setLinks] = useState<ILink[]>([]);

  useEffect(() => {
    if (username) {
      // const res = await axios.post('/api/links', { username });
      const res = {
        data: {
          links: [
            { label: 'Instagram', link: 'https://www.instagram.com/willsmith' },
            {
              label: "Enemy's Instagram",
              link: 'https://www.instagram.com/chrisrock',
            },
          ],
        },
      };
      const { links: linksFromBackend } = res.data;
      setLinks(linksFromBackend);
    }
  }, [username, setLinks]);

  const renderLinks = () =>
    links.map(({ label, link }) => (
      <div key={label} className="mb-4">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="block w-full rounded-md border-8 border-black py-3 px-5 text-black hover:bg-black/10"
        >
          {label}
        </a>
      </div>
    ));

  return { renderLinks };
};

const Create = () => {
  const { user } = useGlobalContext();
  const { renderLinks } = useLinks(user?.username);

  return (
    <Main
      meta={
        <Meta title="Profile" description="View and manage your OneLink." />
      }
    >
      {user ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-center font-sans text-2xl font-bold text-white">
                {`${user.username}'s Profile`}
              </h1>
            </div>
            <div className="flex items-center">
              <Link href="/edit">
                <a className="mt-2 rounded-full bg-white px-5 py-2 text-lg font-bold text-black">
                  Edit
                </a>
              </Link>
              <Link href={`/l/${user.linkName}`}>
                <a className="mt-2 ml-2 rounded-full bg-white px-5 py-2 text-lg font-bold text-black">
                  Preview
                </a>
              </Link>
            </div>
          </div>
          <div className="container mt-2 rounded-lg bg-white px-7 py-5">
            <div>{renderLinks()}</div>
          </div>
        </>
      ) : (
        '...'
      )}
    </Main>
  );
};

export default Create;
