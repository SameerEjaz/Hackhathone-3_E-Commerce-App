'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import { Product } from '@/types/interfaces';
import { LuSlidersHorizontal } from 'react-icons/lu';

export default function LikedProductsPage() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  useEffect(() => {
    
    const likedProductsData = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    setLikedProducts(likedProductsData);

  
    const uniqueTags: string[] = Array.from(new Set(likedProductsData.flatMap((product: { tags: string; }) => product.tags || [])));
    setTags(uniqueTags);
  }, []);

  
  const handleFilter = (category: string) => {
    if (category === 'all') {
      setLikedProducts(JSON.parse(localStorage.getItem('likedProducts') || '[]'));
    } else {
      const filtered = likedProducts.filter((product) => product.tags?.includes(category));
      setLikedProducts(filtered);
    }
    setCurrentPage(1); 
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = likedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <Image src={'/Back.png'} alt="background image" width={1920} height={1080} className="object-cover w-full h-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image src={'/Logo.png'} alt="Logo" width={90} height={90} />
          <h1 className="text-4xl font-bold">Liked Products</h1>
          <div className="text-sm">
            <Link href={'/Home'} className="font-bold">
              Home &gt;
            </Link>
            <Link href={'/LikedProducts'} className="text-gray-500">
              Liked Products
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full">
        <div className="flex justify-around bg-[#F9F1E7] items-center mb-10 py-3 px-4 border-b border-gray-300">
          {/* Left Section - Filter */}
          <div className="flex relative gap-4">
            <button className="flex items-center space-x-2 p-2 border rounded" onClick={() => setShowFilters(!showFilters)}>
              <LuSlidersHorizontal />
              <span className="font-medium">Filter</span>
            </button>

            {/* Dropdown Filters */}
            {showFilters && (
              <div className="absolute z-10 top-10 left-2 mt-2 w-40 bg-white shadow-lg border rounded-lg p-3 max-h-60 overflow-y-auto">
                <button className="w-full text-left p-2 hover:bg-gray-200 rounded" onClick={() => handleFilter('all')}>
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="w-full text-left p-2 hover:bg-gray-200 rounded"
                    onClick={() => handleFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="text-gray-600 p-2 border-gray-400 border-l b-2">
            Showing {Math.min(currentItems.length, itemsPerPage)} of {likedProducts.length} results
          </div>
        </div>

        {/* Product Grid */}
        {currentItems.length > 0 ? (
          <ProductGrid products={currentItems} />
        ) : (
          <p className="text-center text-gray-500">No liked products available</p>
        )}

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={likedProducts.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}
