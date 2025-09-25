import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const CartPage = () => {
    const { cartItems } = useCart();

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Start adding some flowers!</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <CartSummary />
                </div>
            )}
        </div>
    );
};

export default CartPage;