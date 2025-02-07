"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import Pagination from "@/components/Pagination";
import { Product } from '@/types/interfaces'; 
import { LuSlidersHorizontal } from "react-icons/lu";

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]); 
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState("default");
    const [tags, setTags] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16; 

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts();
            setProducts(data);
            setFilteredProducts(data);

            
            const uniqueTags: string[] = Array.from(new Set(data.flatMap((product: { tags: string; }) => product.tags || [])));
            setTags(uniqueTags);
        }
        fetchProducts();
    }, []);

   
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortBy(value);

        const sortedProducts = [...products];

        if (value === "price-low-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === "price-high-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (value === "newest") {
            sortedProducts.sort((a, b) => Number(b.isNew) - Number(a.isNew)); 
        } else if (value === "discount") {
            sortedProducts.sort((a, b) => b.dicountPercentage - a.dicountPercentage);
        }

        setFilteredProducts(sortedProducts);
    };

    // Filtering Logic
    const handleFilter = (category: string) => {
        if (category === "all") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.tags?.includes(category));
            setFilteredProducts(filtered);
        }
        setCurrentPage(1); 
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
        <div>
            {/* Hero Section */}
            <div className="relative">
                <Image src={"/Back.png"} alt="background image" width={1920} height={1080} className="object-cover w-full h-60 " />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Image src={"/Logo.png"} alt="Logo" width={90} height={90} />
                    <h1 className="text-4xl font-bold">Shop</h1>
                    <div className="text-sm">
                        <Link href={"/Home"} className="font-bold">Home &gt;</Link>
                        <Link href={"/Shop"} className="text-gray-500">Shop</Link>
                    </div>
                </div>
            </div>

            {/* Filter & Sorting Section */}
            <div className="w-full ">
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
                                <button className="w-full text-left p-2 hover:bg-gray-200 rounded" onClick={() => handleFilter("all")}>All</button>
                                {tags.map((tag) => (
                                    <button key={tag} className="w-full text-left p-2 hover:bg-gray-200 rounded" onClick={() => handleFilter(tag)}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    <div className="text-gray-600 p-2 border-gray-400 border-l b-2">
                        Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredProducts.length} results
                    </div>
                    </div>
                    
                    {/* Right Section - Sorting */}
                    <div className="flex items-center space-x-2">
                        <span>Sort by</span>
                        <select className="border rounded px-2 py-1" value={sortBy} onChange={handleSortChange}>
                            <option value="default">Default</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="newest">Newest</option>
                            <option value="discount">Best Discount</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {currentItems.length > 0 ? (
                    <ProductGrid products={currentItems} />
                ) : (
                    <p className="text-center text-gray-500">No products available right now</p>
                )}

                {/* Pagination Component */}
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredProducts.length} itemsPerPage={itemsPerPage} />
            </div>
        </div>
    );
}
