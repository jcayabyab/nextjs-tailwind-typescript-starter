import LinkForm from '@/components/LinkForm';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Create = () => {
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
        Create your OneLink
      </h1>
      <div className="container mt-2 rounded-lg bg-white px-3 py-5">
        <LinkForm />
      </div>
    </Main>
  );
};

export default Create;
