'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { PiShoppingCartBold } from 'react-icons/pi';
import { HiOutlineUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import CartSidebar from './CartSideBar';
import { getSearchResults } from '../sanity/lib/search'; 
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/clerk-react';  

const Navbar = () => {
  const { user, isSignedIn } = useUser();  
  const { signOut } = useClerk();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<[]>([]);  
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null); 

  console.log(searchResults)
  console.log(loading)

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseClick = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      const results = await getSearchResults(query);
      setSearchResults(results);
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push('/Home');  // Redirect to home after sign out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // Toggle dropdown visibility
  };

  if (!isClient) {
    return null; // Prevent SSR mismatch during the first render
  }

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="hidden lg:flex justify-around items-center shadow-lg w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src={'/Logo.png'} alt="Logo" width={80} height={60} />
          <span className="text-2xl font-bold">Furniro</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-10 text-end text-[16px] font-medium">
          <a href="/Home">Home</a>
          <a href="/Shop">Shop</a>
          <a href="/Blog">Blog</a>
          <a href="/Contact">Contact</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 relative">
          {isSignedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Profile Dropdown */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                <Image
                  src={user?.imageUrl || '/default-profile.png'}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-4 w-48">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link href="/UserProfile">
                      <button className="text-blue-500 text-sm">Profile</button>
                    </Link>
                    <button onClick={handleSignOut} className="text-red-500 text-sm">Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/Sign-In">
              <HiOutlineUser className="w-6 h-6 cursor-pointer" />
            </Link>
          )}
          {!isSearchOpen && (
            <FiSearch onClick={handleSearchClick} aria-label="Search" className="w-6 h-6 cursor-pointer" />
          )}
          {isSearchOpen && (
            <div className="flex items-center space-x-2 border p-2 bg-gray-100  shadow-lg">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-none outline-none p-3 bg-gray-100 w-72 h-6"
              />
              <button
                onClick={handleCloseClick}
                aria-label="Close search"
                className="text-xl font-bold cursor-pointer"
              >
                ✖
              </button>
            </div>
          )}
          <Link href={'/LikedProducts'}>
            <FaRegHeart className="w-6 h-6 cursor-pointer" />
          </Link>
          <PiShoppingCartBold className="w-6 h-6 cursor-pointer" onClick={() => setIsCartOpen(true)} />
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </div>
  );
};

export default Navbar;
