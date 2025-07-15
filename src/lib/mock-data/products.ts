import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic T-Shirt',
    category: 'Apparel',
    price: 24.99,
    variants: [
      { sku: 'TS-BLK-S', color: 'Black', size: 'S' },
      { sku: 'TS-BLK-M', color: 'Black', size: 'M' },
      { sku: 'TS-WHT-M', color: 'White', size: 'M' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 49.99,
    variants: [{ sku: 'MO-WL-01' }],
  },
  {
    id: 'prod-3',
    name: 'Coffee Mug',
    category: 'Home Goods',
    price: 12.5,
    variants: [{ sku: 'MG-CER-BL' }],
  },
  {
    id: 'prod-4',
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 75.0,
    variants: [{ sku: 'WL-LTH-BRN' }],
  },
  {
    id: 'prod-5',
    name: 'Denim Jeans',
    category: 'Apparel',
    price: 89.99,
    variants: [
        { sku: 'JE-BLU-32', size: '32' },
        { sku: 'JE-BLU-34', size: '34' }
    ],
  },
  {
    id: 'prod-6',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 120.00,
    variants: [{ sku: 'SPK-BT-GRY' }],
  },
  {
    id: 'prod-7',
    name: 'Scented Candle',
    category: 'Home Goods',
    price: 22.00,
    variants: [{ sku: 'CDL-LAV' }],
  },
  {
    id: 'prod-8',
    name: 'Canvas Backpack',
    category: 'Accessories',
    price: 65.00,
    variants: [{ sku: 'BPK-CV-GRN' }],
  }
];
