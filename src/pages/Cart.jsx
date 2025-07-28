import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleQuantityChange = (id, quantity) => {
        const newQuantity = parseInt(quantity, 10);
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            dispatch(removeFromCart(id));
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (!userInfo) {
        return (
            <div className="container mx-auto p-8 text-center bg-white min-h-screen font-plex">
                <h1 className="text-4xl font-semibold mb-4">Please Sign In to View Your Cart</h1>
                <p className="text-gray-600 mb-6 text-lg">
                    You need to be logged in to access your shopping cart.
                </p>
                <Link
                    to="/signin"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-8 rounded font-inika"
                >
                    Sign In
                </Link>
                <p className="mt-4 text-gray-500 text-lg">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline font-inika">Create one</Link>
                </p>
            </div>
        );
    }


    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center bg-white min-h-screen font-plex">
                <h1 className="text-4xl font-semibold mb-4">Your Amazon Cart is empty.</h1>
                <p className="text-gray-600 mb-6 text-lg">
                    Check your Saved for later items, or continue shopping.
                </p>
                <Link
                    to="/"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-8 rounded font-inika"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div className="container mx-auto flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4 bg-white p-6 shadow-md">
                    <h1 className="text-3xl font-semibold mb-2">Shopping Cart</h1>
                    <hr className="mb-6" />

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b"
                        >
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain flex-shrink-0" />
                            <div className="flex-grow">
                                <h2 className="text-lg font-medium">{item.title}</h2>
                                <p className="text-sm text-green-700 font-semibold">In Stock</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        {[...Array(20).keys()].map(n => (
                                            <option key={n + 1} value={n + 1}>Qty: {n + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-sm text-cyan-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-1/4">
                    <div className="bg-white p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Subtotal ({cartItems.length} items):
                            <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
                        </h2>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;