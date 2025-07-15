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

export type Collection = {
  id: string;
  title: string;
  productCount: number;
};

export type Supplier = {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
}

export type PurchaseOrder = {
    id: string;
    supplierId: string;
    supplierName: string;
    date: string;
    expectedDelivery: string;
    status: 'Draft' | 'Sent' | 'Partial' | 'Received' | 'Cancelled';
    total: number;
    itemCount: number;
}

export type GoodsReceivedNote = {
    id: string;
    poId: string;
    supplierName: string;
    receivedDate: string;
    locationId: string;
    locationName: string;
    itemCount: number;
}

export type StockTransfer = {
    id: string;
    fromLocationId: string;
    fromLocationName: string;
    toLocationId: string;
    toLocationName: string;
    date: string;
    status: 'Pending' | 'In Transit' | 'Completed';
    itemCount: number;
}


export const collections: Collection[] = [
    { id: 'col-1', title: 'Summer Collection', productCount: 12 },
    { id: 'col-2', title: 'New Arrivals', productCount: 5 },
    { id: 'col-3', title: 'On Sale', productCount: 23 },
    { id: 'col-4', title: 'Apparel', productCount: 8 },
];

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

export const suppliers: Supplier[] = [
    { id: 'sup-1', name: 'Global Textiles Inc.', contactPerson: 'Sarah Chen', email: 'sarah.chen@globaltextiles.com', phone: '123-456-7890', address: '123 Textile Ave, Industry City, 10001' },
    { id: 'sup-2', name: 'Gadget Masters', contactPerson: 'Mike Rivera', email: 'mike.r@gadgetmasters.net', phone: '987-654-3210', address: '456 Tech Park, Silicon Valley, 94025' },
    { id: 'sup-3', name: 'Home Essentials Co.', contactPerson: 'Emily White', email: 'emily@homeessentials.co', phone: '555-123-4567', address: '789 Decor St, Crafton, 54321' },
];

export const purchaseOrders: PurchaseOrder[] = [
    { id: 'PO-001', supplierId: 'sup-1', supplierName: 'Global Textiles Inc.', date: '2023-11-01', expectedDelivery: '2023-11-15', status: 'Received', total: 5250.00, itemCount: 2 },
    { id: 'PO-002', supplierId: 'sup-2', supplierName: 'Gadget Masters', date: '2023-11-05', expectedDelivery: '2023-11-20', status: 'Sent', total: 10000.00, itemCount: 1 },
    { id: 'PO-003', supplierId: 'sup-3', supplierName: 'Home Essentials Co.', date: '2023-11-10', expectedDelivery: '2023-11-25', status: 'Draft', total: 3000.00, itemCount: 3 },
];

export const goodsReceivedNotes: GoodsReceivedNote[] = [
    { id: 'GRN-001', poId: 'PO-001', supplierName: 'Global Textiles Inc.', receivedDate: '2023-11-14', locationId: 'loc-1', locationName: 'Main Warehouse', itemCount: 2 },
];

export const stockTransfers: StockTransfer[] = [
    { id: 'ST-001', fromLocationId: 'loc-1', fromLocationName: 'Main Warehouse', toLocationId: 'loc-2', toLocationName: 'Downtown Store', date: '2023-11-10', status: 'Completed', itemCount: 50 },
    { id: 'ST-002', fromLocationId: 'loc-1', fromLocationName: 'Main Warehouse', toLocationId: 'loc-3', toLocationName: 'Uptown Store', date: '2023-11-12', status: 'In Transit', itemCount: 30 },
];
