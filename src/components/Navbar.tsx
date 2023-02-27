import React from 'react';

import Link, { LinkProps } from 'next/link';

import { AppConfig } from '@/utils/AppConfig';

// eslint-disable-next-line unused-imports/no-unused-vars
const NextLink: React.FC<LinkProps> = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 bg-white px-4 pt-4 pb-2">
      <div className="text-3xl font-bold text-purple-900">
        <Link href="/">
          <a>{AppConfig.title}</a>
        </Link>
      </div>
    </div>
  );
}
