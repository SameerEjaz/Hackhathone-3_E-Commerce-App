'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/clerk-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import { CartItemType } from '@/types/interfaces';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../../../../actions/createCheckoutSession';

interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  city: string;
  address: string;
  phone: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
  } | null>(null);
  const [message, setMessage] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log(message)

  const handleCheckOut = async (info: {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
  }) => {
    if (!isSignedIn) return;
    setIsLoading(true);
    setMessage(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: info.name,
        customerEmail: info.email,
        clerkUserId: user!.id,
        city: info.address,
        address: info.address,
        phone: info.phone,
      };

      const items = cartItems.map((item) => ({
        ...item,
        image: item.imageUrl,
      })) as unknown as CartItemType[];

      if (items.length === 0) {
        alert('Your cart is empty.');
      }

      const response = await createCheckoutSession(items, metadata);
      console.log('Stripe session response', response);

      if (response.success) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: response.sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='relative'>
        <Image
          src='/Back.png'
          alt='background image'
          className='object-cover w-full h-60'
          width={1930}
          height={1060}
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <Image
            src='/Logo.png'
            alt='Logo'
            className='object-contain'
            width={90}
            height={90}
          />
          <h1 className='text-4xl font-bold '>Checkout</h1>
          <div className='text-sm mt-4'>
            <Link href={'/Home'} className='font-bold'>
              Home &gt;{' '}
            </Link>
            <Link href={'/Checkout'} className='text-gray-500'>
              Checkout
            </Link>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {/* Billing Details Section */}
        <div>
          <h2 className='text-2xl font-bold mb-6'>Billing details</h2>
          <CustomerInfoForm onSubmit={setCustomerInfo} />
        </div>

        {/* Order Summary Section */}
        <div>
          <h2 className='container p-5 text-2xl font-bold mb-3'>Order Summary</h2>
          <div className='rounded-md'>
            <div className='p-4 border-b'>
              {cartItems.map((item) => (
                <div key={item._id} className='flex justify-between'>
                  <span>{item.title}</span>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className='p-4 border-b'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className='flex justify-between'>
                <span>Total</span>
                <span className='text-xl font-bold'>
                  ${subtotal}
                </span>
              </div>
            </div>
            <div className='p-4'>
              <h3 className='text-lg font-semibold mb-4'>Payment Method</h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='payment'
                    name='payment'
                    className='mr-2'
                    defaultChecked
                  />
                  <label htmlFor='payment'>Stripe</label>
                </div>
              </div>
              <p className='text-sm max-w-[529px] text-gray-500 mt-4'>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and for
                other purposes described in our privacy policy.
              </p>
              <button
                onClick={() => handleCheckOut(customerInfo!)}
                disabled={isLoading || !customerInfo || cartItems.length === 0}
                className='border-2 border-black w-[280px] h-14 mt-4 py-3 rounded-lg bg-[#B88E2F] text-white'
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
