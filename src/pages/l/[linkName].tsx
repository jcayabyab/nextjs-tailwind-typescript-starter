import { useRouter } from 'next/router';

import LikeButton from '@/components/LikeButton';
import LikeCounter from '@/components/LikeCounter';
import useLinks from '@/hooks/useLinks';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const OneLink = () => {
  const router = useRouter();
  const { linkName } = router.query;

  const { renderLinks, onelinkOwner, likes, handleLike, liked } = useLinks(
    linkName as string
  );

  return (
    <Main
      meta={
        <Meta title="Profile" description="View and manage your OneLink." />
      }
    >
      {onelinkOwner ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-center font-sans text-2xl font-bold text-white">
                {`${onelinkOwner.username}'s Profile`}
              </h1>
              <LikeCounter likes={likes} />
            </div>
            <LikeButton handleLike={handleLike} liked={liked} />
          </div>
          <div className="mt-2 rounded-lg bg-white px-7 py-5">
            <div>{renderLinks()}</div>
          </div>
        </>
      ) : (
        '...'
      )}
    </Main>
  );
};

export default OneLink;
