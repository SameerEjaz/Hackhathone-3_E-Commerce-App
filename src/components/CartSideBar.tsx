'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


type CartSidebarProps = {
    isCartOpen: boolean;
    setIsCartOpen: (value: boolean) => void;
};

type CartItem = {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
};

const CartSidebar = ({ isCartOpen, setIsCartOpen }: CartSidebarProps) => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    useEffect(() => {
        const fetchCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItems(storedCart);
        };

        fetchCartItems();

        // Listen for cart updates
        window.addEventListener("cartUpdated", fetchCartItems);
        return () => window.removeEventListener("cartUpdated", fetchCartItems);
    }, []);

     
    const removeItem = (id: string) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated")); // Notify ProductCard
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div
            className={`border-2 fixed top-0 right-0 h-[496px] w-96 bg-white shadow-lg transform ${
                isCartOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform z-50`}
        >
            {/* Header */}
            <div className='flex justify-between items-center p-4 border-b shadow-sm'>
                <h2 className='text-lg font-semibold'>Shopping Cart</h2>
                <AiOutlineClose className='w-6 h-6 cursor-pointer' onClick={() => setIsCartOpen(false)} />
            </div>

            {/* Cart Content */}
            <div className='p-4 flex flex-col gap-6 h-80 overflow-y-auto'>
                {cartItems.length > 0 ? cartItems.map(item => (
                    <div key={item._id} className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Image src={item.image} alt={item.title} height={64} width={64} className='w-16 h-16 object-cover rounded-md' />
                            <div>
                                <h3 className='text-base font-medium'>{item.title}</h3>
                                <p className='text-sm text-[#B88E2F]'>{item.quantity} x $. {item.price.toLocaleString()}</p>
                            </div>
                        </div>
                        <button onClick={() => removeItem(item._id)} className='text-gray-400 hover:text-black text-lg'>
                            ×
                        </button>
                    </div>
                )) : <p className="text-center text-gray-500">Your cart is empty</p>}
            </div>

            {/* Footer */}
            <div className='p-4 border-t'>
                <div className='flex justify-between text-sm font-semibold'>
                    <span>Subtotal</span>
                    <span className='text-[#B88E2F]'>$. {subtotal.toLocaleString()}</span>
                </div>
                <div className='flex flex-row justify-between mt-4 text-sm'>
                    <button onClick={() => router.push('/Cart')} className='w-[121px] h-8 rounded-xl border-2 border-black'>
                        View Cart
                    </button>
                    <button onClick={()=>router.push('/Checkout')} className='w-[121px] h-8 rounded-xl border-2 border-black'>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
