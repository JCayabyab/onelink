import LinkForm from '@/components/LinkForm';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useLinks from '@/hooks/useLinks';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Edit = () => {
  const { user } = useGlobalContext();
  const { links } = useLinks(user?.username);

  return (
    <Main
      meta={
        <Meta
          title="Create OneLink"
          description="Create a OneLink page for your account."
        />
      }
    >
      <h1 className="mb-4 text-center font-sans text-2xl font-bold text-white">
        Edit your OneLink
      </h1>
      <div className="container mt-2 rounded-lg bg-white px-3 py-5">
        <LinkForm initialLinkInput={links} sendButtonText="Save" />
      </div>
    </Main>
  );
};

export default Edit;
