import { useState, useEffect } from 'react';

import { IUser, useGlobalContext } from '@/contexts/GlobalContext';

export interface ILink {
  label: string;
  link: string;
}

const useLinks = (linkName: string | undefined) => {
  const [links, setLinks] = useState<ILink[] | null>(null);
  const [onelinkOwner, setOnelinkOwner] = useState<IUser | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const { user } = useGlobalContext();

  useEffect(() => {
    if (linkName) {
      // const res = await axios.post('/api/links', { linkName });
      const res = {
        data: {
          user: {
            username: 'willsmith',
            linkName: 'will',
          },
          links: [
            { label: 'Instagram', link: 'https://www.instagram.com/willsmith' },
            {
              label: "Enemy's Instagram",
              link: 'https://www.instagram.com/chrisrock',
            },
          ],
          likes: 20,
        },
      };
      const {
        links: linksFromBackend,
        user: ownerFromBackend,
        likes: likesFromBackend,
      } = res.data;
      setLinks(linksFromBackend);
      setOnelinkOwner(ownerFromBackend);
      setLikes(likesFromBackend);
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

  const addLike = () => {
    // TODO: Add try-catch when this is implemented
    if (!user) {
      return;
    }
    // await axios.post('/api/like', { username, linkName })
    setLikes((prevLikes) => prevLikes + 1);
    setLiked(true);
  };

  const removeLike = () => {
    // TODO: Add try-catch when this is implemented
    if (!user) {
      return;
    }
    // await axios.post('/api/unlike', { user.username, linkName })
    setLikes((prevLikes) => prevLikes - 1);
    setLiked(false);
  };

  const handleLike = () => {
    if (liked) {
      removeLike();
    } else {
      addLike();
    }
  };

  return {
    renderLinks,
    links,
    onelinkOwner,
    likes,
    liked,
    handleLike,
  };
};

export default useLinks;
