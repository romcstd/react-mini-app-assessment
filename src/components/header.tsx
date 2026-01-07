import type React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <header className="bg-zinc-900 px-6 py-6 sm:px-12">
        <nav className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="text-xl font-bold text-zinc-100 sm:text-2xl">
            <Link to="/">React Mini-App Assessment</Link>
          </h1>
          <ul className="flex gap-8 text-zinc-50">
            <li>
              <Link to="/projects" className="">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/posts" className="">
                Posts
              </Link>
            </li>
            <li>
              <Link to="/products" className="">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
