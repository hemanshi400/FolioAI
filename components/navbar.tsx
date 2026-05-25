'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl gradient-text">
          FolioAI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white transition">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-dark-700 p-4 space-y-4">
          <Link href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white transition">
            Features
          </Link>
          <Link href="#pricing" className="block text-gray-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white transition">
            Pricing
          </Link>
          <div className="space-y-2">
            <Link href="/sign-in" className="block">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" className="block">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
