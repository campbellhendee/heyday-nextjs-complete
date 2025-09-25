import React from 'react';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl, description }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-700">${price.toFixed(2)}</p>
                <p className="text-gray-600">{description}</p>
                <a href={`/shop/${id}`} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                    View Details
                </a>
            </div>
        </div>
    );
};

export default ProductCard;