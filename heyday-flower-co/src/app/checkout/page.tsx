import React from 'react';

const CheckoutPage = () => {
    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Shipping Address</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="payment">Payment Information</label>
                    <input type="text" id="payment" name="payment" required />
                </div>
                <button type="submit">Complete Purchase</button>
            </form>
        </div>
    );
};

export default CheckoutPage;