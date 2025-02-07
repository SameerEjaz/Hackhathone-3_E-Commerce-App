"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImBin2 } from "react-icons/im";
import { CartItemType } from "@/types/interfaces";


const Cart = () => {
  
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Load cart data from localStorage
  useEffect(() => {
    const fetchCartItems = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    };

    fetchCartItems();

    // Listen for cart updates
    window.addEventListener("cartUpdated", fetchCartItems);
    return () => window.removeEventListener("cartUpdated", fetchCartItems);
  }, []);

  // Remove item from cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


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
          <h1 className="text-4xl font-bold">Cart</h1>
          <div className=" mt-4">
            <Link href={"/Home"} className="font-bold">Home &gt;</Link>
            <Link href={"/Cart"} className="text-gray-500"> Cart</Link>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Product Details Section */}
          <div className="lg:col-span-3">
            {/* Headings */}
            <div className="hidden lg:grid grid-cols-4 gap-4 mb-4 text-gray-600 text-center font-medium">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {/* Product Rows */}
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id} className="grid lg:grid-cols-4 gap-4 items-center border-b b-2 pb-4">
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <Image src={item.image ||"Empty" } alt={item.title ||"Empty"} width={60} height={60} 
                    className="rounded-md object-contain"/>
                    <p className="font-medium text-gray-800">{item.title}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center font-medium text-gray-800">$. {item.price.toLocaleString()}</div>

                  {/* Quantity */}
                  <div className="text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => updateQuantity(item._id, parseInt(e.target.value))}
                      className="border rounded-md w-16 text-center"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="text-center font-medium text-gray-800">
                    $. {(item.price * item.quantity).toLocaleString()}
                  </div>

                  {/* Remove Button */}
                  <ImBin2 onClick={() => removeItem(item._id)} className="text-[#B88E2F] cursor-pointer w-20 h-5"/>
                </div>
              ))
            ) : (
              <p className="text-center justify-center text-3xl text-gray-500 m-10">Your cart is empty</p>
            )}
          </div>

          {/* Cart Totals Section */}
          <div className="bg-gray-100 p-6 rounded-md shadow-md lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Cart Totals</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">$. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-xl">$. {subtotal.toLocaleString()}</span>
            </div>
            <button  className="w-full h-12 border-2 border-black py-2 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
