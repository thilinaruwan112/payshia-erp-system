'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '@/lib/data';
import { products } from '@/lib/data';
import { ProductGrid } from '@/components/pos/product-grid';
import { OrderPanel } from '@/components/pos/order-panel';
import { PosHeader } from '@/components/pos/pos-header';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

export type CartItem = {
  product: Product;
  quantity: number;
};

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
    setDrawerOpen(false); // Close drawer after clearing cart
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, category]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
     const subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const taxRate = 0.08;
      const tax = subtotal * taxRate;
      return subtotal + tax;
  }, [cart]);


  const orderPanelComponent = (
     <OrderPanel
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        isDrawer={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
  );


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] h-screen w-screen bg-background text-foreground overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <PosHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
        />
        <main className="flex-1">
          <ProductGrid products={filteredProducts} onProductSelect={addToCart} />
        </main>
      </div>

      {/* Desktop Order Panel */}
      <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-card border-t lg:border-t-0 lg:border-l border-border flex-col hidden lg:flex">
         {orderPanelComponent}
      </div>

       {/* Mobile "View Order" button and Drawer */}
        {cart.length > 0 && (
             <div className="lg:hidden fixed bottom-4 left-4 right-4 z-20">
                <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                         <Button className="w-full h-14 text-lg shadow-lg">
                            <div className="flex items-center justify-between w-full">
                                <div className='flex items-center gap-2'>
                                    <ShoppingCart className="h-6 w-6" />
                                    <span>View Order</span>
                                    <Badge variant="secondary" className="text-base">{totalItems}</Badge>
                                </div>
                                <span className='font-bold'>${totalAmount.toFixed(2)}</span>
                            </div>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='h-[90vh]'>
                       {orderPanelComponent}
                    </DrawerContent>
                </Drawer>
            </div>
        )}
    </div>
  );
}
