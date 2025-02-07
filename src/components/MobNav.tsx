'use client';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { PiShoppingCartBold } from 'react-icons/pi';
import CartSidebar from './CartSideBar';
import { getSearchResults } from '../sanity/lib/search';
import Link from 'next/link';

// Sidebar component Fu*k
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-2/3 bg-white h-full shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
    >
      <div className="p-5">
        <button onClick={toggleSidebar} className="text-xl font-bold">✖</button>
        <ul className="mt-10 space-y-6">
          <li>
            <a href="/Home" className="text-lg font-medium">Home</a>
          </li>
          <li>
            <a href="/Shop" className="text-lg font-medium">Shop</a>
          </li>
          <li>
            <a href="/Blog" className="text-lg font-medium">Blog</a>
          </li>
          <li>
            <a href="/Contact" className="text-lg font-medium">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MobNav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to track cart visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To toggle search box visibility
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  interface SearchResult {
    _id: string;
    slug: { current: string };
    image: string;
    title: string;
    price: number;
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Search results state
  const [loading, setLoading] = useState(false); // Loading state for search
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility


  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);

      // Fetch search results
      const results = await getSearchResults(query);
      setSearchResults(results);
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky shadow-lg top-0 z-10 bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="w-full mx-auto  lg:hidden block">
        <div className="flex justify-between items-center p-7">
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <FaBars />
          </div>

          {/* Logo and Store Name  */}
          <div className="flex justify-center items-center flex-grow">
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />
            <span className="text-xl font-bold">Furniro</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href={'/Sign-In'}>
            <HiOutlineUser className="w-5 h-5 cursor-pointer"/>
            </Link>

            {/* Search Input Area - Inline with Icons */}
            {!isSearchOpen && (
              <FiSearch
                onClick={() => setIsSearchOpen(true)} // Open search input
                className="w-5 h-5 cursor-pointer"
              />
            )}
            {isSearchOpen && (
              <div className="flex items-center space-x-2 border p-2 bg-gray-100 shadow-lg absolute top-20 right-0 w-80 z-20">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="border-none outline-none p-3 bg-gray-100 w-full"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  aria-label="Close search"
                  className="text-xl font-bold cursor-pointer"
                >
                  ✖
                </button>
              </div>
            )}
            <Link href={'/LikedProducts'}>
            <FaRegHeart className="w-5 h-5 cursor-pointer" />
            </Link>
            <PiShoppingCartBold
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsCartOpen(true)} // Open the cart sidebar
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg p-4 z-30">
          {loading ? (
            <p>Loading...</p>
          ) : searchResults.length === 0 && searchQuery.length > 0 ? (
            <p>No results found</p>
          ) : (
            <ul>
              {searchResults.map((result) => (
                <li key={result._id} className="flex mb-3">
                  <a
                    href={`/productDetail/${result.slug.current}`}
                    className="w-full mt-1 block py-2 px-4 hover:bg-gray-200"
                  >
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={50}
                      height={40}
                      className="rounded-full inline-block mr-2"
                    />
                    {result.title} - ${result.price}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </div>
  );
};

export default MobNav;
