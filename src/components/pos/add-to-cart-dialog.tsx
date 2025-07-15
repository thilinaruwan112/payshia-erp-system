
'use client';

import React, { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Delete } from 'lucide-react';

interface AddToCartDialogProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, discount: number) => void;
}

export function AddToCartDialog({
  product,
  onClose,
  onAddToCart,
}: AddToCartDialogProps) {
  const [quantity, setQuantity] = useState('1');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity('1');
      setDiscount(0);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      const numQuantity = parseInt(quantity, 10);
      if (numQuantity > 0) {
        onAddToCart(product, numQuantity, discount);
      }
    }
  };

  const handleQuantityButtonClick = (value: string) => {
    if (quantity === '0' || quantity === '1') {
      setQuantity(value);
    } else {
      setQuantity(quantity + value);
    }
  };

  const handleClear = () => {
    setQuantity('1');
  };
  
  const handleDelete = () => {
    if (quantity.length > 1) {
        setQuantity(quantity.slice(0, -1));
    } else {
        setQuantity('1');
    }
  };

  const isOpen = !!product;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {product && (
          <>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`https://placehold.co/100x100.png`}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                  data-ai-hint="product photo"
                />
                <div>
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center gap-2 rounded-md border p-2 justify-center text-2xl font-bold h-11">
                        {quantity}
                    </div>
                     <div className="grid grid-cols-3 gap-2">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                            <Button key={num} variant="outline" type="button" onClick={() => handleQuantityButtonClick(num)} className="h-12 text-lg">
                                {num}
                            </Button>
                        ))}
                         <Button variant="outline" type="button" onClick={handleClear} className="h-12 text-lg">C</Button>
                        <Button variant="outline" type="button" onClick={() => handleQuantityButtonClick('0')} className="h-12 text-lg">0</Button>
                         <Button variant="outline" type="button" onClick={handleDelete} className="h-12 text-lg"><Delete className="h-5 w-5" /></Button>
                    </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="discount">Item Discount ($)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    startIcon="$"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAddToCart} disabled={!quantity || parseInt(quantity) <= 0}>Add to Order</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
