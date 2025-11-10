import type React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-zinc-900 px-6 py-6 sm:px-12">
      <p className="text-center text-zinc-100">
        &copy; {currentYear} React Mini-App Assessment. All rights reserved.
      </p>
    </footer>
  );
};
