'use client';

import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

const Profile = () => {
  const { user } = useUser();  
  const { signOut } = useClerk();  
  const router = useRouter(); 
  const handleSignOut = async () => {
    await signOut();  
    router.push('/Sign-In');  
  };

  return (
    <div>
      {/* Profile Section */}
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={user?.imageUrl || '/default-profile.png'}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
            
            
            <Link href="/sign-in/reset">
              <p className="text-blue-500 underline">Forgot your password?</p>
            </Link>
            
            <div className="mt-6">
              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}  
                className="w-44 py-2 rounded-lg bg-red-500 text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
