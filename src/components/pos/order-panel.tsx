
'use client';

import React from 'react';
import type { CartItem } from '@/app/(pos)/pos-system/page';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Trash2,
  MinusCircle,
  PlusCircle,
  X,
  CreditCard,
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface OrderPanelProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function OrderPanel({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: OrderPanelProps) {
  const { toast } = useToast();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handlePayment = () => {
    toast({
      title: 'Payment Successful',
      description: `Charged $${total.toFixed(2)}.`,
    });
    onClearCart();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold">Current Order</h2>
      </div>

      <ScrollArea className="flex-1">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
            <p>Your cart is empty. Select a product to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cart.map((item) => (
              <div key={item.product.id} className="p-4 flex gap-4">
                <Image
                  src="https://placehold.co/64x64.png"
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                  data-ai-hint="product photo"
                />
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="text-muted-foreground text-sm">
                    ${item.product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 mt-auto">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 mt-auto text-muted-foreground hover:text-destructive"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-border mt-auto space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span>{tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(2)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={onClearCart}
            disabled={cart.length === 0}
          >
            <X className="mr-2 h-4 w-4" /> Clear
          </Button>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePayment}
            disabled={cart.length === 0}
          >
            <CreditCard className="mr-2 h-4 w-4" /> Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
