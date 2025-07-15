
'use client';

import React from 'react';
import type { Product } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductGrid({ products, onProductSelect }: ProductGridProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
