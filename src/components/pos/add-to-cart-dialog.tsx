
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
import { Minus, Plus } from 'lucide-react';

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
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setDiscount(0);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity, discount);
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 text-center"
                      min="1"
                    />
                     <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
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
              <Button onClick={handleAddToCart}>Add to Order</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
