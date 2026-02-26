"use client";

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Order, Product } from '../../components/types';
import ProductRow from '../../components/ProductRow';

const productOptions = [
    { name: 'Greek Yogurt', price: 5.00 },
    { name: 'Milk', price: 3.00 },
    { name: 'Bread', price: 2.50 },
    { name: 'Cheese', price: 4.00 },
    { name: 'Apples', price: 2.00 },
];

export default function NewOrderPage() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const defaultOrderDate = today.toISOString().split('T')[0];
    const defaultDeliveryDate = tomorrow.toISOString().split('T')[0];

    const [order, setOrder] = useState<Order>({
        type: 'sale',
        status: 'Completed',
        orderDate: defaultOrderDate,
        deliveryDate: defaultDeliveryDate,
        address: '',
        products: [{ id: '1', name: 'Greek Yogurt', quantity: 1, discount: 0, price: 5.00 }],
        notes: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const total = useMemo(() => {
        return order.products.reduce((sum, p) => sum + p.price * p.quantity * (1 - p.discount / 100), 0);
    }, [order.products]);

    const handleOrderChange = (field: keyof Order, value: any) => {
        setOrder(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleProductChange = (id: string, field: keyof Product, value: string | number) => {
        setOrder(prev => ({
            ...prev,
            products: prev.products.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addProduct = () => {
        const newId = Date.now().toString();
        const newProduct: Product = { id: newId, name: 'Greek Yogurt', quantity: 1, discount: 0, price: 5.00 };
        setOrder(prev => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const deleteProduct = (id: string) => {
        setOrder(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!order.address.trim()) newErrors.address = 'Address is required';
        if (order.products.length === 0) newErrors.products = 'At least one product is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Order saved:', order);
            // TODO: save to backend
            alert('Order saved successfully!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Dashboard
                </Link>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold mb-6">Create New Order</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Order Type */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Order Type</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="sale"
                                        checked={order.type === 'sale'}
                                        onChange={() => handleOrderChange('type', 'sale')}
                                        className="mr-2"
                                    />
                                    Order from Customer (Sale)
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="purchase"
                                        checked={order.type === 'purchase'}
                                        onChange={() => handleOrderChange('type', 'purchase')}
                                        className="mr-2"
                                    />
                                    Order to Provider (Purchase)
                                </label>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Status</label>
                            <select
                                value={order.status}
                                onChange={(e) => handleOrderChange('status', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>

                        {/* Dates */}
                        <div className="mb-4 flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Order Date</label>
                                <input
                                    type="date"
                                    value={order.orderDate}
                                    onChange={(e) => handleOrderChange('orderDate', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Delivery Date (Optional)</label>
                                <input
                                    type="date"
                                    value={order.deliveryDate || ''}
                                    onChange={(e) => handleOrderChange('deliveryDate', e.target.value || undefined)}
                                    placeholder="mm/dd/yyyy"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Address</label>
                            <input
                                type="text"
                                value={order.address}
                                onChange={(e) => handleOrderChange('address', e.target.value)}
                                placeholder="Enter delivery or pickup address"
                                className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        {/* Products */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-gray-700 font-semibold">Products</label>
                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    + Add Product
                                </button>
                            </div>
                            {order.products.map(product => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onChange={handleProductChange}
                                    onDelete={deleteProduct}
                                    productOptions={productOptions}
                                />
                            ))}
                            {errors.products && <p className="text-red-500 text-sm mt-1">{errors.products}</p>}
                        </div>

                        {/* Notes */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Notes (Optional)</label>
                            <textarea
                                value={order.notes}
                                onChange={(e) => handleOrderChange('notes', e.target.value)}
                                placeholder="Add any additional notes..."
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        {/* Total */}
                        <div className="mb-6 text-right">
                            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Save Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}