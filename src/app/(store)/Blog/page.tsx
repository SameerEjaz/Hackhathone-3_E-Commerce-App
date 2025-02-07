'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Rectangle13 from "../Assest/Rectangle 13.png";
import Rectangle14 from "../Assest/Rectangle 14.png";
import Rectangle15 from "../Assest/Rectangle 15.png";
import Link from "next/link";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${search}`);
  };

  return (
    <div>
    <div className="relative">
    <Image src={'/Back.png'} alt="background image" 
     width={1930} 
     height={1060} 
     className="w-full object-cover h-60 mb-10"
     />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Image src={'/Logo.png'} alt="Logo"  width={90} height={90} />
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className=" mt-4">
        <Link href={"/Home"} className="font-bold">Home &gt;</Link>
        <Link href={"/Blog"} className="text-gray-500"> Blog</Link>
      </div>
    </div>
  </div>
    <div className="max-w-6xl mx-auto p-6">
       
      {/* Search Bar */}
      <div className="flex justify-end mb-8">
        <form onSubmit={handleSearch} className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-full pl-4 pr-10 shadow-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-500">
            🔍
          </button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Blog Posts */}
        <div className="col-span-2 space-y-10">
          {[ 
            { img: Rectangle13, category: "Wood", title: "Going all-in with millennial design" },
            { img: Rectangle14, category: "Handmade", title: "Exploring new ways of decorating" },
            { img: Rectangle15, category: "Wood", title: "Handmade pieces that took time to make" }
          ].map((post, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Image src={post.img} alt={post.title} className="w-full" />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <span>👤 Admin</span>
                  <span>📅 14 Oct 2022</span>
                  <span>🏷️ {post.category}</span>
                </div>
                <h2 className="text-2xl font-semibold mt-3">{post.title}</h2>
                <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <a href="#" className="text-blue-600 mt-4 inline-block">Read more</a>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {["Crafts", "Design", "Handmade", "Interior", "Wood"].map((category, index) => (
              <li key={index} className="text-gray-600 flex justify-between">
                <a href="#" className="hover:text-blue-500">{category}</a>
                <span className="text-gray-400">{Math.floor(Math.random() * 10)}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-4">Recent Posts</h3>
          <ul className="space-y-3">
            {[Rectangle13, Rectangle14, Rectangle15].map((img, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Image src={img} alt="Recent Post" className="w-16 h-16 rounded object-cover" />
                <div>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Recent Post Title</a>
                  <p className="text-gray-500 text-sm">03 Aug 2022</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {[1, 2, 3].map((num) => (
          <button key={num} className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 font-semibold">{num}</button>
        ))}
        <button className="px-4 py-2 bg-gray-300 rounded-full text-gray-700 font-semibold">Next</button>
      </div>
    </div>
    </div>
  );
}
