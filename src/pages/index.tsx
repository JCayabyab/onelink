import Link from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';
import useLinks from '@/hooks/useLinks';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

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
