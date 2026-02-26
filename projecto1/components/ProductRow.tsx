import { Product } from './types';

interface ProductRowProps {
    product: Product;
    onChange: (id: string, field: keyof Product, value: string | number) => void;
    onDelete: (id: string) => void;
    productOptions: { name: string; price: number }[];
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onChange, onDelete, productOptions }) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = productOptions.find(p => p.name === e.target.value);
        if (selected) {
            onChange(product.id, 'name', selected.name);
            onChange(product.id, 'price', selected.price);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(product.id, 'quantity', parseInt(e.target.value) || 0);
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(product.id, 'discount', parseFloat(e.target.value) || 0);
    };

    const totalPrice = product.price * product.quantity * (1 - product.discount / 100);

    return (
        <div className="flex items-center space-x-4 mb-4">
            <select
                value={product.name}
                onChange={handleNameChange}
                className="flex-1 p-2 border border-gray-300 rounded"
            >
                {productOptions.map(option => (
                    <option key={option.name} value={option.name}>{option.name}</option>
                ))}
            </select>
            <input
                type="number"
                value={product.quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-20 p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                value={product.discount}
                onChange={handleDiscountChange}
                min="0"
                max="100"
                step="0.01"
                className="w-20 p-2 border border-gray-300 rounded"
            />
            <span className="w-24 text-right">${totalPrice.toFixed(2)}</span>
            <button
                onClick={() => onDelete(product.id)}
                className="text-red-500 hover:text-red-700"
            >
                ×
            </button>
        </div>
    );
};

export default ProductRow;