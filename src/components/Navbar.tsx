import React from 'react';

import Link from 'next/link';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { AppConfig } from '@/utils/AppConfig';

export default function Navbar() {
  const { logout } = useGlobalContext();

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-300 bg-white px-4">
      <div className="pt-4 pb-8">
        <div className="text-3xl font-bold text-gray-900">
          <Link href="/">
            <a>{AppConfig.title}</a>
          </Link>
        </div>
      </div>
      <div>
        <ul className="flex flex-wrap text-xl">
          <li className="mr-6">
            <button
              className="border-none text-gray-700 hover:text-gray-900"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
