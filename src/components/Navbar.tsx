import React, { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { LinkIcon, LogoutIcon, PencilAltIcon } from '@heroicons/react/solid';
import Link, { LinkProps } from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { AppConfig } from '@/utils/AppConfig';

import SearchBar from './SearchBar';

const NextLink: React.FC<LinkProps> = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default function Navbar() {
  const { user, logout } = useGlobalContext();

  return (
    <div className="flex items-center justify-between border-b border-gray-300 bg-white px-4 pt-4 pb-2">
      <div>
        <div className="text-3xl font-bold text-purple-900">
          <Link href="/">
            <a>{AppConfig.title}</a>
          </Link>
        </div>
      </div>
      {user ? (
        <div className="ml-2 flex min-w-0 max-w-xs flex-1 items-center justify-end">
          <SearchBar />
          <Menu as="div" className="ml-4">
            <Menu.Button as={Fragment}>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 font-sans text-2xl font-semibold text-white hover:bg-purple-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                {user && user.username && user.username[0]?.toUpperCase()}
              </button>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NextLink href="/">
                        <a
                          className={`${
                            active
                              ? 'bg-purple-900 text-white'
                              : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          <LinkIcon className="mr-2 h-5 w-5" />
                          Your OneLink
                        </a>
                      </NextLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NextLink href="/edit">
                        <a
                          className={`${
                            active
                              ? 'bg-purple-900 text-white'
                              : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          <PencilAltIcon className="mr-2 h-5 w-5" />
                          Edit OneLink
                        </a>
                      </NextLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-purple-900 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={logout}
                      >
                        <LogoutIcon className="mr-2 h-5 w-5" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </div>
  );
}
