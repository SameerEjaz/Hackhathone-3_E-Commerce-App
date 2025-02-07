'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ImCancelCircle } from 'react-icons/im';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if the session_id exists in the query parameters or if any other relevant state is set
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const orderNumber = urlParams.get('orderNumber');

    if (!sessionId || !orderNumber) {
      // If the session_id or orderNumber is missing, redirect to the homepage
      router.push('/');
    }
  }, [router]);

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-orange-500 text-white">
      <div className="bg-white text-black p-10 rounded-lg shadow-lg text-center">
        <ImCancelCircle className="text-red-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-4xl font-bold mb-4">Cancelled</h1>
        <p className="text-lg mb-8">Your payment was Cancelled!!</p>
        <div className="flex justify-around">
          <button
            onClick={handleHomeClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
