export type Product = {
  id: string;
  name: string;
  category: string;
  variants: {
    sku: string;
    color?: string;
    size?: string;
  }[];
  price: number;
};

export type Location = {
  id: string;
  name: string;
  type: 'Warehouse' | 'Store';
};

export type InventoryItem = {
  productId: string;
  sku: string;
  locationId: string;
  stock: number;
  reorderLevel: number;
};

export type Order = {
  id: string;
  customerName: string;
  channel: 'E-commerce' | 'Retail' | 'Wholesale' | 'POS';
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { sku: string; quantity: number }[];
};

export type User = {
  name: string;
  role: 'Admin' | 'Manager' | 'Sales Agent';
  avatar: string;
};

export const locations: Location[] = [
  { id: 'loc-1', name: 'Main Warehouse', type: 'Warehouse' },
  { id: 'loc-2', name: 'Downtown Store', type: 'Store' },
  { id: 'loc-3', name: 'Uptown Store', type: 'Store' },
];

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
];

export const inventory: InventoryItem[] = [
  { productId: 'prod-1', sku: 'TS-BLK-S', locationId: 'loc-1', stock: 120, reorderLevel: 20 },
  { productId: 'prod-1', sku: 'TS-BLK-S', locationId: 'loc-2', stock: 30, reorderLevel: 10 },
  { productId: 'prod-1', sku: 'TS-BLK-M', locationId: 'loc-1', stock: 80, reorderLevel: 20 },
  { productId: 'prod-1', sku: 'TS-BLK-M', locationId: 'loc-3', stock: 15, reorderLevel: 10 },
  { productId: 'prod-1', sku: 'TS-WHT-M', locationId: 'loc-1', stock: 95, reorderLevel: 20 },
  { productId: 'prod-1', sku: 'TS-WHT-M', locationId: 'loc-2', stock: 8, reorderLevel: 10 },
  { productId: 'prod-2', sku: 'MO-WL-01', locationId: 'loc-1', stock: 200, reorderLevel: 50 },
  { productId: 'prod-2', sku: 'MO-WL-01', locationId: 'loc-2', stock: 45, reorderLevel: 15 },
  { productId: 'prod-2', sku: 'MO-WL-01', locationId: 'loc-3', stock: 0, reorderLevel: 15 },
  { productId: 'prod-3', sku: 'MG-CER-BL', locationId: 'loc-1', stock: 300, reorderLevel: 50 },
  { productId: 'prod-3', sku: 'MG-CER-BL', locationId: 'loc-2', stock: 60, reorderLevel: 20 },
  { productId: 'prod-4', sku: 'WL-LTH-BRN', locationId: 'loc-1', stock: 50, reorderLevel: 10 },
  { productId: 'prod-4', sku: 'WL-LTH-BRN', locationId: 'loc-3', stock: 5, reorderLevel: 5 },
];

export const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        channel: 'E-commerce',
        date: '2023-10-26',
        status: 'Delivered',
        total: 49.98,
        items: [{ sku: 'TS-BLK-M', quantity: 2 }],
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        channel: 'Retail',
        date: '2023-10-28',
        status: 'Shipped',
        total: 12.50,
        items: [{ sku: 'MG-CER-BL', quantity: 1 }],
    },
    {
        id: 'ORD-003',
        customerName: 'Alice Johnson',
        channel: 'POS',
        date: '2023-10-29',
        status: 'Processing',
        total: 124.98,
        items: [{ sku: 'MO-WL-01', quantity: 2 }, { sku: 'TS-WHT-M', quantity: 1 }],
    },
    {
        id: 'ORD-004',
        customerName: 'Bob Brown',
        channel: 'Wholesale',
        date: '2023-10-30',
        status: 'Pending',
        total: 750.00,
        items: [{ sku: 'WL-LTH-BRN', quantity: 10 }],
    },
    {
        id: 'ORD-005',
        customerName: 'Charlie Davis',
        channel: 'E-commerce',
        date: '2023-10-31',
        status: 'Cancelled',
        total: 24.99,
        items: [{ sku: 'TS-WHT-M', quantity: 1 }],
    }
];
