import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div className="w-full text-gray-700 antialiased">
      {props.meta}

      <Navbar />
      <div className="mx-auto max-w-screen-md">
        <div className="content mx-2 py-5 text-xl">{props.children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm text-white">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Made for
          SENG 513 W22.
        </div>
      </div>
    </div>
  );
};

export { Main };
