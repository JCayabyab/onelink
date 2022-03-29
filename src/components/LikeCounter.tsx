import React from 'react';

import { HeartIcon } from '@heroicons/react/solid';

interface LikeCounterProps {
  likes: number;
}

export default function LikeCounter({ likes }: LikeCounterProps) {
  return (
    <div className="mx-3 inline-flex flex-col items-center text-red-500">
      <HeartIcon className="h-10 w-10" />
      <div className="text-sm text-white">{likes} Likes</div>
    </div>
  );
}
