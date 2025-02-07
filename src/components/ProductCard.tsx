'use client';
import { Product } from '@/types/interfaces';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // State to track whether the product is liked
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the product is in the liked list when the component mounts
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    setIsLiked(likedProducts.some((likedProduct: Product) => likedProduct._id === product._id));
  }, [product._id]);

  // Add to Cart Handler
  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: Product) => item._id === product._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item: Product) =>
        item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    toast.success(`${product.title} has been added to the cart!`, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: true,
    });

    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Handle the card click for navigation
  const handleCardClick = () => {
    window.location.href = `/productDetail/${product.slug?.current}`;
  };

  // Handle like button click
  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation

    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');

    let updatedLikedProducts;
    if (isLiked) {
      // Remove from liked products
      updatedLikedProducts = likedProducts.filter((item: Product) => item._id !== product._id);
    } else {
      // Add to liked products
      updatedLikedProducts = [...likedProducts, product];
    }

    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));

    setIsLiked(!isLiked);
  };

  // Handle share button click
  const handleShareClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation
    // You can add your share logic here
    console.log('Product shared:', product.title);
  };

  // Handle compare button click
  const handleCompareClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation
    // You can add your compare logic here
    console.log('Product added to compare:', product.title);
  };

  return (
    <div
      className="relative max-w-64 mx-auto text-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      key={product._id}
      onClick={handleCardClick} // Manually handling the navigation for the entire card
    >
      {/* Product Image and Information */}
      <div className="relative">
        <Image
          src={product.image}
          alt={product.title}
          width={256}
          height={200}
          className="w-full h-48 object-contain"
        />
        {product.dicountPercentage && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            -{product.dicountPercentage}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.tags}</p>
        <div className="flex justify-center items-center gap-2">
          <p className="text-lg font-bold">$ {product.price.toLocaleString()}</p>
          {product.dicountPercentage && (
            <p className="text-gray-400 text-sm line-through">
              $ {((product.price * 100) / (100 - product.dicountPercentage)).toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Hoverable Area for buttons */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={handleAddToCart}
          className="bg-white text-black font-semibold py-2 px-4 rounded-lg mb-2"
        >
          Add to cart
        </button>
        <div className="flex gap-3">
          {/* Like Button */}
          <button
            onClick={handleLikeClick}
            className={`text-white ${isLiked ? 'text-red-500' : ''}`}
          >
            {isLiked ? '❤️' : '🤍'} Like
          </button>
          {/* Share and Compare Buttons */}
          <button
            onClick={handleShareClick}
            className="text-white"
          >
            &#x1F517; Share
          </button>
          <button
            onClick={handleCompareClick}
            className="text-white"
          >
            &#x1F504; Compare
          </button>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
