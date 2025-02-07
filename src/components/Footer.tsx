import React from "react";
import { FaTrophy } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { FiTruck } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';


const Footer = () => {
  return (
    <footer className="bg-white py-8 font-sans">
      <div className=" bg-[#FAF3EA] gap-5 flex md:flex-row flex-col text-center justify-around items-center lg:py-20 py-10">
      <div className="feature flex items-center gap-4">
        <FaTrophy className="text-4xl" />
        <div className="text-left">
          <h3 className="font-bold text-xl">High Quality</h3>
          <p className="text-gray-400">crafted from top materials</p>
        </div>
      </div>
      <div className="feature flex items-center gap-4">
        <MdVerified className="text-4xl" />
        <div className="text-left">
          <h3 className="font-bold text-xl">Warranty Protection</h3>
          <p className="text-gray-400">Over 2 years</p>
        </div>
      </div>
      <div className="feature flex items-center gap-4">
        <FiTruck className="text-4xl" />
        <div className="text-left">
          <h3 className="font-bold text-xl">Free Shipping</h3>
          <p className="text-gray-400">Order over 150 $</p>
        </div>
      </div>
      <div className="feature flex items-center gap-4">
        <BiSupport className="text-4xl" />
        <div className="text-left">
          <h3 className="font-bold text-xl">24 / 7 Support</h3>
          <p className="text-gray-400">Dedicated support</p>
        </div>
      </div>
    
      </div>

      <div className="container mx-auto lg:my-20 my-10 flex flex-wrap lg:text-start text-center items-start">
        {/* Address Section */}
        <div className="w-full lg:w-1/4 mb-6">
        <h3 className="text-3xl font-bold mb-6">Funiro.</h3>
          <p className="text-gray-500 text-sm leading-6">
            400 University Drive Suite 200 Coral Gables,<br />
            FL 33134 USA
          </p>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-1/4 mb-6">
          <h4 className="text-gray-400 font-semibold text-sm mb-7">Links</h4>
          <ul className="space-y-5">
            <li>
              <a href="/Home" className="text-black text-sm hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/Shop" className="text-black text-sm hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="text-black text-sm hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/Contact" className="text-black text-sm hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="w-full lg:w-1/4 mb-6 ">
          <h4 className="text-gray-400 font-semibold text-sm mb-6">Help</h4>
          <ul className="space-y-6">
            <li>
              <a href="/payment-options" className="text-black text-sm hover:underline">
                Payment Options
              </a>
            </li>
            <li>
              <a href="/returns" className="text-black text-sm hover:underline">
                Returns
              </a>
            </li>
            <li>
              <a href="/privacy-policies" className="text-black text-sm hover:underline">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="w-full lg:w-1/4 ">
          <h4 className="text-gray-400 font-semibold text-sm mb-3">Newsletter</h4>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 px-4 py-2 text-sm  border-b  border-gray-400 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm underline underline-offset-8 rounded"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pl-24 mt-8 text-sm text-gray-500">
        <p>2022 Meubel House. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
