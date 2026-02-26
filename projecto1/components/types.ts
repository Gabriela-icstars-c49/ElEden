interface Product {
    id: string;
    name: string;
    quantity: number;
    discount: number;
    price: number;
}

interface Order {
    id: string;
    customer?: string;
    type: 'sale' | 'purchase';
    status: string;
    orderDate: string;
    deliveryDate?: string;
    address: string;
    products: Product[];
    notes?: string;
}

export type { Product, Order };