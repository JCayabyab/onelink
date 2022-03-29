import { useState, useEffect } from 'react';

import { IUser } from '@/contexts/GlobalContext';

export interface ILink {
  label: string;
  link: string;
}

const useLinks = (linkName: string | undefined) => {
  const [links, setLinks] = useState<ILink[] | null>(null);
  const [onelinkOwner, setOnelinkOwner] = useState<IUser | null>(null);

  useEffect(() => {
    if (linkName) {
      // const res = await axios.post('/api/links', { linkName });
      const res = {
        data: {
          user: {
            username: 'willsmith',
            password: 'password',
            linkName: 'will',
          },
          links: [
            { label: 'Instagram', link: 'https://www.instagram.com/willsmith' },
            {
              label: "Enemy's Instagram",
              link: 'https://www.instagram.com/chrisrock',
            },
          ],
        },
      };
      const { links: linksFromBackend, user } = res.data;
      setLinks(linksFromBackend);
      setOnelinkOwner(user);
    }
  }, [linkName, setLinks]);

  const renderLinks = () =>
    links ? (
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
      ))
    ) : (
      <div>...</div>
    );
  return { renderLinks, links, onelinkOwner };
};

export default useLinks;
