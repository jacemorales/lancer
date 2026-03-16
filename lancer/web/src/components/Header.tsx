import React from 'react';
import Link from 'next/link';
import Button from './Button';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              WorkPlug
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-600 hover:text-blue-600">
              Find Work
            </Link>
            <Link href="/jobs/new" className="text-gray-600 hover:text-blue-600">
              Post a Job
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="secondary">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
            <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;