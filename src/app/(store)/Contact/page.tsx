import React from 'react';
import Image from 'next/image';
import { PiPhoneFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from 'react-icons/go';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <section className="bg-[#f9f9f9] mb-20">

        <div className="relative">
        <Image 
        src={'/Back.png'}
        alt="background image" 
        width={1920}
        height={1060}
        className="object-cover w-full h-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center ">
       {/* Logo */}
        <Image 
        src={'/Logo.png'} 
        alt="Logo"
        width={90}
        height={90}
        className="object-contain" />
            <h1 className="text-4xl font-bold ">Contact</h1>
          <div className="mt-4">
          <Link href={'/Home'} className="font-bold">Home &gt;</Link>
          <Link href={'/Contact'} className="text-gray-500"> Contact </Link>
          </div>
        </div>
      </div>

      {/* Header Section  */}
      <div className="container mx-auto text-center px-6 my-20">
        <h1 className="text-[48px] lg:leading-0 leading-[58px] lg:text-[52px] font-bold mb-4">Get In Touch With Us</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-[644px] mx-auto">
          For More Information About Our Product & Services, 
          Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out.
        </p>
      </div>

    {/* Contact Information and Form Section Centered */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center px-6">
        {/* Contact Info Section (Left) */}
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0 lg:px-20">
          <div className="space-y-8">
            <div className="flex items-center max-w-[212px]">
              <span className="text-[24px] mr-3"><FaLocationDot /></span>
              <div className='flex flex-col'>
              <strong>Address</strong>
              <p> 236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className="flex items-center max-w-[212px]">
              <span className="text-[24px] mr-3"><PiPhoneFill /></span>
              <div className='flex flex-col'>
              <strong>Phone:</strong>
              <p> Mobile: +(84) 546-6789<br />Hotline: +(84) 456-6789</p>
              </div>
            </div>
            <div className="flex items-center max-w-[212px]">
              <span className="text-[24px] mr-3"><GoClockFill /></span>
              <div className='flex flex-col'>
              <strong>Working Time:</strong>
              <p> Monday-Friday: 9:00 - 22:00<br />Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section (Right) */}
        <div className="lg:w-1/2 lg:px-20">
          <form>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold text-lg mb-2">Your Name</label>
                <input type="text" id="name" className="border-2 border-gray-300 rounded-lg p-3" placeholder="Abc" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold text-lg mb-2">Email Address</label>
                <input type="email" id="email" className="border-2 border-gray-300 rounded-lg p-3" placeholder="Abc@def.com" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="subject" className="font-semibold text-lg mb-2">Subject</label>
                <input type="text" id="subject" className="border-2 border-gray-300 rounded-lg p-3" placeholder="This is optional" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="font-semibold text-lg mb-2">Message</label>
                <textarea id="message" className="border-2 border-gray-300 rounded-lg p-3 h-[150px]" placeholder="Hi! I’d like to ask about"></textarea>
              </div>
              <button type="submit" className="w-[240px] py-3 bg-[#B88E2F] text-white text-lg font-semibold rounded-lg">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
