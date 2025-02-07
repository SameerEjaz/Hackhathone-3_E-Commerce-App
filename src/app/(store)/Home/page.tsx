'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import ProductCard from '@/components/ProductCard';
import BakgroundI from '../Assest/BakgroundI.png';
import bedRoom from '../Assest/bedRoom.png';
import Dine from '../Assest/Dine.png';
import Living from '../Assest/Living.png';
import Inspiration1 from '../Assest/Inspiration1.png';
import Inspiration2 from '../Assest/Inspiration2.png';
import { Product } from '@/types/interfaces';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const inspirations = [
    { id: 1, image: Inspiration1, tag: 'bedroom', title: 'Inner Peace' },
    { id: 2, image: Inspiration2, tag: 'dining', title: 'Elegant Dining' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleImageClick = (index: number, tag: string) => {
    setActiveIndex(index);  
    router.push(`/Shop?filter=${tag}`);  
  };

  return (
    <div className="container mx-auto px-4 my-10">
      
      {/* Hero Section */}
      <div className="relative w-full h-[650px] flex items-center justify-center">
        <Image
          src={BakgroundI}
          alt="BackGroundImage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-[8] grid grid-cols-1 md:grid-cols-2 w-full h-full">
          <div className="flex items-center justify-center">
            {/* Left Column Content */}
          </div>
          
          <div
            className="flex justify-center my-auto"
            style={{
              maxWidth: '643px',
              height: '443px',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            <div
              className="bg-[#FFF3E3] p-6 max-w-md rounded-lg"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '60%',
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
            >
              <h2 className="text-xl font-bold text-[#5f4b3b]">New Arrivals</h2>
              <h2 className="text-5xl font-bold text-[#333333] mt-4">
                Discover Our New Collection
              </h2>
              <p className="text-[#333333] mt-2">Lorem ipsum dolor sit amet...</p>
              <Link href={'/Shop'}>
              <button className="mt-4 bg-[#B88E2F] text-white py-2 px-4 rounded">
                BUY NOW
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="text-center my-12">
        <h2 className="text-4xl font-bold">Browse The Range</h2>
        <p className="text-gray-500">Lorem ipsum dolor sit amet...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 font-bold mx-auto mt-6 gap-6">
          <div className='mx-auto hover:scale-110'>
            <Image src={Dine} alt="Dining" width={400} height={400} className="rounded-lg border-2" />
            <p className="mt-8 text-xl">Dining</p>
          </div>
          <div className='mx-auto hover:scale-110'>
            <Image src={Living} alt="Living" width={400} height={400} className="rounded-lg border-2" />
            <p className="mt-8 text-xl">Living</p>
          </div>
          <div className='mx-auto hover:scale-110'>
            <Image src={bedRoom} alt="BedRoom" width={400} height={400} className="rounded-lg border-2" />
            <p className="mt-8 text-xl">Bedroom</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="my-20">
        <h2 className="text-center text-4xl font-bold my-10">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => ( 
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/Shop">
            <button className="border-[#B88E2F] border text-[#B88E2F] px-6 py-2 rounded">View More</button>
          </Link>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="bg-[#FAF3EA] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Side */}
          <div className="w-full md:w-1/3 justify-center text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#3A3A3A]">
              50+ Beautiful Rooms Inspiration
            </h2>
            <p className="text-gray-600 mt-2">
              Our designer already made a lot of beautiful prototypes of rooms that inspire you.
            </p>
            <Link href={"/Shop"}>
            <button className="mt-4 bg-[#B88E2F] text-white px-5 py-2 rounded">
              Explore More
            </button>
            </Link>
          </div>

          {/* Right Side: Inspiration Images */}
          <div className="w-full md:w-2/3 flex flex-wrap  justify-center md:justify-end space-x-4 mt-8 md:mt-0">
            {inspirations.map((inspiration, index) => (
              <div
                key={inspiration.id}
                className={`relative w-full sm:w-1/2 lg:w-1/3 cursor-pointer transition-transform duration-300 ease-in-out transform ${
                  activeIndex === index ? 'scale-110 z-[8px]' : 'scale-95'
                }`}
                onClick={() => handleImageClick(index, inspiration.tag)}
              >
                <Image
                  src={inspiration.image}
                  alt={inspiration.title}
                  width={400}   
                  height={250}  
                  className="rounded-lg"
                />
                <div className="absolute bottom-5 left-5 bg-white p-4 rounded shadow-lg">
                  <p className="text-gray-500">0{index + 1} — {inspiration.tag}</p>
                  <h3 className="text-lg font-bold">{inspiration.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
