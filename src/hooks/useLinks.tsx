import { useState, useEffect } from 'react';

import axios from 'axios';

import { IUser, useGlobalContext } from '@/contexts/GlobalContext';

export interface ILink {
  label: string;
  link: string;
}

const useLinks = (oneLink: string | undefined) => {
  const [links, setLinks] = useState<ILink[] | null>(null);
  const [onelinkOwner, setOnelinkOwner] = useState<IUser | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const { user } = useGlobalContext();

  useEffect(() => {
    async function getLink() {
      if (oneLink) {
        const res = await axios.post('/api/links', { oneLink });
        const linkOwnerFromBackend: IUser = {
          username: res.data.username,
          oneLink: res.data.oneLink,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          likes: Object.keys(res.data.likes).map((key) => [key]),
          links: Object.keys(res.data.links).map((key: any) => ({
            label: key,
            link: res.data.links[key],
          })),
        };
        setOnelinkOwner(linkOwnerFromBackend);
      }
    }
    getLink();
  }, [oneLink]);

  useEffect(() => {
    if (onelinkOwner?.links?.length > 0) {
      setLinks(onelinkOwner?.links);
    }
    setLikes(onelinkOwner?.likes);
  }, [onelinkOwner]);

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
    // await axios.post('/api/like', { username, oneLink })
    setLikes((prevLikes) => prevLikes + 1);
    setLiked(true);
  };

  const removeLike = () => {
    // TODO: Add try-catch when this is implemented
    if (!user) {
      return;
    }
    // await axios.post('/api/unlike', { user.username, oneLink })
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
