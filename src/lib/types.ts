
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
  salesChannels: ('E-commerce' | 'Retail' | 'Wholesale' | 'POS')[];
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
  id: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Sales Agent' | 'Customer';
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

export type Plan = {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    ctaLabel: string;
}
