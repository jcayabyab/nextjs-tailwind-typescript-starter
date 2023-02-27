import React, { useEffect, useState } from 'react';

import { HeartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { useGlobalContext } from '@/contexts/GlobalContext';

interface LikeButtonProps {
  handleLike: () => void;
  liked: boolean;
}

export default function LikeButton({ handleLike, liked }: LikeButtonProps) {
  const [isViewingOtherProfile, setIsViewingOtherProfile] =
    useState<boolean>(false);
  const router = useRouter();
  const { user } = useGlobalContext();

  useEffect(() => {
    const path = router.pathname;
    if (path.slice(0, 3) === '/l/') {
      const { linkName } = router.query;
      if (user && linkName !== user.oneLink) {
        setIsViewingOtherProfile(true);
      }
    }
  }, [setIsViewingOtherProfile, router, user]);

  return (
    <button
      className={`mt-2 items-center rounded-full bg-white px-5 py-2 text-lg font-bold text-black ${
        isViewingOtherProfile ? 'inline-flex' : 'hidden'
      }`}
      onClick={handleLike}
    >
      <HeartIcon className="mr-2 h-10 w-10" />
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
}
