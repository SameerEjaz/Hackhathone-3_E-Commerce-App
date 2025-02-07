'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/interfaces';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sofa1 from '../../Assest/Sofa1.png';
import Sofa2 from '../../Assest/Sofa2.png';


const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const query = `*[_type == 'product' && slug.current == "${slug}"][0]{
          title,
          price,
          "image": productImage.asset->url,
          description,
          tags,
          isNew,
          dicountPercentage,
          _id,
          sku,
          category
        }`;
        const data = await client.fetch(query);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <div className='text-center py-52 text-5xl '>Loading...</div>;
  if (!product) return <div className='text-center py-52 text-5xl '>Product not found</div>;

  const handleAddToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: Product) => item._id === product._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item: Product) =>
        item._id === product._id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...product, quantity: 1, selectedSize, selectedColor }
      ];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="space-x-3 mt-10 mb-20">
        <Link href={'/Home'} className="text-gray-500">Home &gt;</Link>
        <Link href={'/Shop'} className="text-gray-500">Shop &gt;</Link>
        <Link href={'#'} className="font-semibold b-2 border-l border-black"> {product.title} </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image src={product.image} alt={product.title} width={350} height={300} className="rounded-lg shadow-md object-cover mx-auto" />
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="flex gap-2 text-xl text-gray-700 mb-2">$. {product.price.toLocaleString()}
          {product.dicountPercentage && (
            <a className="text-gray-400 mt-1 text-sm line-through">
              $ {((product.price * 100) / (100 - product.dicountPercentage)).toFixed(2)}
            </a>
          )}
          </p>
          <div className='flex items-center gap-3'>
            <span className="text-yellow-500 text-lg ">★★★★★</span>
            <p className="text-sm text-gray-500">5 Customer Reviews</p>
          </div>
          <p className='w-[424px] text-gray-500 mt-3 '>Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio.</p>

          <div className="mt-4">
            <p className="font-medium">Size</p>
            <div className="flex space-x-2">
              {['L', 'XL', 'XS'].map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 rounded ${selectedSize === size ? 'bg-black text-white' : ''}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium">Color</p>
            <div className="flex space-x-2">
              {["#D3B897", "#2E2E2E", "#ECECEC"].map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)}
                  className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }}></button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button onClick={handleAddToCart} className="border b-2 border-black px-6 py-2 rounded-lg">Add to Cart</button>
            <button className="border border-black b-2 px-6 py-2 rounded-lg">+ Compare</button>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-sm text-gray-500">SKU: </p>
            <p className="text-sm text-gray-500">Category: {product.title}</p>
            <p className="text-sm text-gray-500">Tags: {product.tags?.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 ">
        <div className="border-b flex justify-center">
          <button
            className={`py-2 px-4 ${activeTab === "description" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "additional" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "reviews" ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews [5]
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {activeTab === "description" && (
            <div className="max-w-[1026px] mx-auto">
              <p> {product.description} </p>
            </div>
          )}
          {activeTab === "additional" && (
            <div className='text-center'>
              <p>Additional information about the product will go here.</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className='text-center'>
              <p>Customer reviews will go here.</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center gap-6 mt-10">
            <Image src={Sofa1} alt="Sofa1" width={600} height={350} />
            <Image src={Sofa2} alt="Sofa2" width={600} height={350} className='bg-[#F9F1E7]' />
          </div>
     {/* Toast container */}
        <ToastContainer />
    </div>
  );
};

export default ProductDetail;
