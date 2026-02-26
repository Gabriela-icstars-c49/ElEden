"use client";

import { useState, useEffect, useMemo } from 'react';
import { Order } from '../../components/types';

const mockPastOrders: Order[] = [
    {
        type: 'sale',
        status: 'Completed',
        orderDate: '2026-02-20',
        deliveryDate: '2026-02-21',
        address: '123 Main St, City',
        products: [
            { id: '1', name: 'Greek Yogurt', quantity: 2, discount: 0, price: 5.00 },
            { id: '2', name: 'Milk', quantity: 1, discount: 0, price: 3.00 }
        ],
        notes: 'Delivered on time'
    },
    {
        type: 'purchase',
        status: 'Completed',
        orderDate: '2026-02-18',
        deliveryDate: '2026-02-19',
        address: '456 Oak Ave, Town',
        products: [
            { id: '3', name: 'Bread', quantity: 5, discount: 5, price: 2.50 }
        ],
        notes: ''
    },
    {
        type: 'sale',
        status: 'Completed',
        orderDate: '2026-02-15',
        address: '789 Pine Rd, Village',
        products: [
            { id: '4', name: 'Cheese', quantity: 3, discount: 0, price: 4.00 },
            { id: '5', name: 'Apples', quantity: 10, discount: 10, price: 2.00 }
        ],
        notes: 'Customer requested organic'
    }
];

export default function PastOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrders(mockPastOrders);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesFilter = filter === 'all' || order.type === filter;
            const matchesSearch = search === '' ||
                order.address.toLowerCase().includes(search.toLowerCase()) ||
                order.notes?.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [orders, filter, search]);

    const calculateTotal = (order: Order) => {
        return order.products.reduce((sum, p) => sum + p.price * p.quantity * (1 - p.discount / 100), 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-8">Loading past orders...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-8 text-red-600">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Past Orders</h1>
                    <p className="text-gray-600 mt-2">View all completed orders</p>
                </div>

                {/* Filter and Search Controls */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by address or notes..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="md:w-48">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="all">All Types</option>
                                <option value="sale">Sales</option>
                                <option value="purchase">Purchases</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {filteredOrders.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No past orders found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {order.type === 'sale' ? 'Sale' : 'Purchase'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{order.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${calculateTotal(order).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{order.notes || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}