import React, { useEffect, useState } from 'react';

import { HeartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { useGlobalContext } from '@/contexts/GlobalContext';

interface HeartButtonProps {
  handleLike: () => void;
}

const HeartButton = ({ handleLike }: HeartButtonProps) => {
  return (
    <button className="text-red-500 hover:text-red-700" onClick={handleLike}>
      <HeartIcon className="h-10 w-10" />
    </button>
  );
};

export default function LikeCounter() {
  const [isViewingOtherProfile, setIsViewingOtherProfile] =
    useState<boolean>(false);
  const router = useRouter();
  const { user } = useGlobalContext();

  useEffect(() => {
    const path = router.pathname;
    if (path.slice(0, 3) === '/l/') {
      const { linkName } = router.query;
      if (!user || linkName !== user.linkName) {
        setIsViewingOtherProfile(true);
      }
    }
  }, [setIsViewingOtherProfile, router, user]);

  return (
    <div className="mx-3 inline-flex flex-col items-center text-red-500">
      {user && isViewingOtherProfile ? (
        <HeartButton handleLike={() => {}} />
      ) : (
        <HeartIcon className="h-10 w-10" />
      )}
      <div className="text-sm text-white">Likes</div>
    </div>
  );
}
