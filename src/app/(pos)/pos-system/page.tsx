'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '@/lib/data';
import { products } from '@/lib/data';
import { ProductGrid } from '@/components/pos/product-grid';
import { OrderPanel } from '@/components/pos/order-panel';
import { PosHeader } from '@/components/pos/pos-header';

export type CartItem = {
  product: Product;
  quantity: number;
};

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, category]);

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      <div className="flex-1 flex flex-col">
        <PosHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
        />
        <ProductGrid products={filteredProducts} onProductSelect={addToCart} />
      </div>
      <div className="w-[380px] lg:w-[420px] flex-shrink-0 bg-card border-l border-border flex flex-col">
        <OrderPanel
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      </div>
    </div>
  );
}
