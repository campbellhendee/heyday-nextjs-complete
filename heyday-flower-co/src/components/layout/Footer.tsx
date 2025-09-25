import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Heyday Flower Co. All rights reserved.</p>
                <div className="mt-2">
                    <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
                    <a href="/shop" className="text-gray-400 hover:text-white mx-2">Shop</a>
                    <a href="/cart" className="text-gray-400 hover:text-white mx-2">Cart</a>
                    <a href="/checkout" className="text-gray-400 hover:text-white mx-2">Checkout</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;