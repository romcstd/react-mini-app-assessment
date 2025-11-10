import type React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <header className="bg-zinc-900 px-6 py-6 sm:px-12">
        <nav>
          <h1 className="text-xl font-bold text-zinc-100 sm:text-2xl">
            <Link to="/" className="">
              React Mini-App Assessment
            </Link>
          </h1>
        </nav>
      </header>
    </>
  );
};
