"use client";

import { useState, useEffect, useMemo } from 'react';
import { Order } from '../../components/types';

const mockFutureOrders: Order[] = [
    {
        id: 'FO001',
        customer: 'John Smith',
        type: 'sale',
        status: 'Pending',
        orderDate: '2026-02-26',
        deliveryDate: '2026-02-28',
        address: '321 Elm St, City',
        products: [
            { id: '1', name: 'Greek Yogurt', quantity: 4, discount: 0, price: 5.00 },
            { id: '2', name: 'Bread', quantity: 2, discount: 0, price: 2.50 }
        ],
        notes: 'Scheduled delivery'
    },
    {
        id: 'FO002',
        customer: 'ABC Corp',
        type: 'purchase',
        status: 'In Progress',
        orderDate: '2026-02-27',
        deliveryDate: '2026-03-01',
        address: '654 Maple Dr, Town',
        products: [
            { id: '3', name: 'Milk', quantity: 10, discount: 0, price: 3.00 }
        ],
        notes: 'Supplier confirmation pending'
    },
    {
        id: 'FO003',
        customer: 'Jane Doe',
        type: 'sale',
        status: 'Scheduled',
        orderDate: '2026-02-28',
        deliveryDate: '2026-03-02',
        address: '987 Birch Ln, Village',
        products: [
            { id: '4', name: 'Cheese', quantity: 5, discount: 5, price: 4.00 },
            { id: '5', name: 'Apples', quantity: 20, discount: 0, price: 2.00 }
        ],
        notes: 'Customer prefers morning delivery'
    },
    {
        id: 'FO004',
        customer: 'XYZ Ltd',
        type: 'purchase',
        status: 'Pending',
        orderDate: '2026-03-01',
        deliveryDate: '2026-03-05',
        address: '111 Oak St, Suburb',
        products: [
            { id: '6', name: 'Greek Yogurt', quantity: 15, discount: 10, price: 5.00 }
        ],
        notes: 'Bulk order'
    },
    {
        id: 'FO005',
        customer: 'Bob Johnson',
        type: 'sale',
        status: 'In Progress',
        orderDate: '2026-03-02',
        deliveryDate: '2026-03-03',
        address: '222 Pine Ave, Downtown',
        products: [
            { id: '7', name: 'Bread', quantity: 8, discount: 0, price: 2.50 },
            { id: '8', name: 'Milk', quantity: 6, discount: 0, price: 3.00 }
        ],
        notes: 'Express delivery requested'
    }
];

interface PageState {
    orders: Order[];
    loading: boolean;
    error: string;
    view: 'table' | 'timeline';
    filter: string;
    search: string;
    selectedOrder: Order | null;
    modalOpen: boolean;
}

export default function FutureOrdersPage() {
    const [state, setState] = useState<PageState>({
        orders: [],
        loading: true,
        error: '',
        view: 'table',
        filter: 'all',
        search: '',
        selectedOrder: null,
        modalOpen: false
    });

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setState(prev => ({ ...prev, orders: mockFutureOrders, loading: false }));
        }, 1000);
    }, []);

    const filteredOrders = useMemo(() => {
        return state.orders.filter(order => {
            const matchesFilter = state.filter === 'all' || order.status === state.filter;
            const matchesSearch = state.search === '' ||
                (order.customer?.toLowerCase().includes(state.search.toLowerCase())) ||
                order.address.toLowerCase().includes(state.search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [state.orders, state.filter, state.search]);

    const sortedOrders = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
            if (!a.deliveryDate || !b.deliveryDate) return 0;
            return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
        });
    }, [filteredOrders]);

    const calculateTotal = (order: Order) => {
        return order.products.reduce((sum, p) => sum + p.price * p.quantity * (1 - p.discount / 100), 0);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Scheduled':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleRowClick = (order: Order) => {
        setState(prev => ({ ...prev, selectedOrder: order, modalOpen: true }));
    };

    const closeModal = () => {
        setState(prev => ({ ...prev, modalOpen: false, selectedOrder: null }));
    };

    const handleEdit = (order: Order) => {
        alert(`Edit order ${order.id}`);
        // TODO: Implement edit functionality
    };

    const handleCancel = (order: Order) => {
        if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
            setState(prev => ({
                ...prev,
                orders: prev.orders.filter(o => o.id !== order.id)
            }));
        }
    };

    if (state.loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-8">Loading future orders...</div>
                </div>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-8 text-red-600">{state.error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Future Orders</h1>
                        <p className="text-gray-600 mt-2">Manage scheduled and pending orders</p>
                    </div>
                    <button
                        onClick={() => alert('Schedule Order functionality - to be implemented')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                    >
                        Schedule Order
                    </button>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                value={state.search}
                                onChange={(e) => setState(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="Search by customer or address..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="md:w-48">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                            <select
                                value={state.filter}
                                onChange={(e) => setState(prev => ({ ...prev, filter: e.target.value }))}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                        </div>
                        <div className="md:w-48">
                            <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
                            <select
                                value={state.view}
                                onChange={(e) => setState(prev => ({ ...prev, view: e.target.value as 'table' | 'timeline' }))}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="table">Table View</option>
                                <option value="timeline">Timeline View</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Display */}
                {state.view === 'table' ? (
                    <FutureOrdersTable
                        orders={filteredOrders}
                        onRowClick={handleRowClick}
                        calculateTotal={calculateTotal}
                        getStatusColor={getStatusColor}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                    />
                ) : (
                    <FutureOrdersTimeline
                        orders={sortedOrders}
                        onOrderClick={handleRowClick}
                        calculateTotal={calculateTotal}
                        getStatusColor={getStatusColor}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                    />
                )}

                {/* Detail Modal */}
                {state.modalOpen && state.selectedOrder && (
                    <OrderDetailModal
                        order={state.selectedOrder}
                        onClose={closeModal}
                        calculateTotal={calculateTotal}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

interface FutureOrdersTableProps {
    orders: Order[];
    onRowClick: (order: Order) => void;
    calculateTotal: (order: Order) => number;
    getStatusColor: (status: string) => string;
    onEdit: (order: Order) => void;
    onCancel: (order: Order) => void;
}

function FutureOrdersTable({ orders, onRowClick, calculateTotal, getStatusColor, onEdit, onCancel }: FutureOrdersTableProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {orders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No future orders found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick(order)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.type === 'sale' ? 'Sale' : 'Purchase'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${calculateTotal(order).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEdit(order); }}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onCancel(order); }}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

interface FutureOrdersTimelineProps {
    orders: Order[];
    onOrderClick: (order: Order) => void;
    calculateTotal: (order: Order) => number;
    getStatusColor: (status: string) => string;
    onEdit: (order: Order) => void;
    onCancel: (order: Order) => void;
}

function FutureOrdersTimeline({ orders, onOrderClick, calculateTotal, getStatusColor, onEdit, onCancel }: FutureOrdersTimelineProps) {
    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">No future orders found</div>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onOrderClick(order)}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {order.id.slice(-2)}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{order.customer || 'N/A'}</h3>
                                    <p className="text-sm text-gray-500">{order.type === 'sale' ? 'Sale' : 'Purchase'} • {order.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">${calculateTotal(order).toFixed(2)}</p>
                                <p className="text-sm text-gray-500">
                                    {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'No date'}
                                </p>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(order); }}
                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onCancel(order); }}
                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
    calculateTotal: (order: Order) => number;
    onEdit: (order: Order) => void;
    onCancel: (order: Order) => void;
}

function OrderDetailModal({ order, onClose, calculateTotal, onEdit, onCancel }: OrderDetailModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <div className="mt-3">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Order Details - {order.id}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Customer</p>
                            <p className="text-sm text-gray-900">{order.customer || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Type</p>
                            <p className="text-sm text-gray-900">{order.type === 'sale' ? 'Sale' : 'Purchase'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Order Date</p>
                            <p className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Scheduled Date</p>
                            <p className="text-sm text-gray-900">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'Not scheduled'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Amount</p>
                            <p className="text-sm text-gray-900">${calculateTotal(order).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-sm text-gray-900">{order.address}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-500">Products</p>
                        <ul className="text-sm text-gray-900">
                            {order.products.map((product) => (
                                <li key={product.id}>
                                    {product.name} - Qty: {product.quantity} - ${product.price.toFixed(2)} each
                                    {product.discount > 0 && ` - ${product.discount}% discount`}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {order.notes && (
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500">Notes</p>
                            <p className="text-sm text-gray-900">{order.notes}</p>
                        </div>
                    )}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => onEdit(order)}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                        >
                            Edit Order
                        </button>
                        <button
                            onClick={() => onCancel(order)}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                        >
                            Cancel Order
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Scheduled':
            return 'bg-green-100 text-green-800';
        case 'In Progress':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}