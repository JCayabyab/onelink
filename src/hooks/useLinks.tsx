import { useState, useEffect } from 'react';

export interface ILink {
  label: string;
  link: string;
}

const useLinks = (username: string | undefined) => {
  const [links, setLinks] = useState<ILink[] | null>(null);

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
  return { renderLinks, links };
};

export default useLinks;
