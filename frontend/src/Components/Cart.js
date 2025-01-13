import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './styles.css';
import {useCart} from "../context/CartContext"; // Assuming you add a specific CSS file for the Cart component

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeFromCart } = useCart();
    // Fetch the user's cart data
    const loadCartData = async () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            try {
                const response = await fetch('http://localhost:5001/api/cart/view', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                const data = await response.json();
                if (data) {
                    const items = data.items || [];
                    console.log("Items: ", items);
                    setCartItems(items);
                    calculateTotal(items); // Calculate total price
                } else {
                    setCartItems([]); // If no items, set empty
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }
    };

    const handleRemoveFromCart = (foodItemId) => {
        removeFromCart(foodItemId, 1); // Remove from context
        setCartItems(cartItems.filter(item => item.foodItemId._id !== foodItemId)); // Update UI
        calculateTotal(cartItems.filter(item => item.foodItemId._id !== foodItemId)); // Recalculate total
    };
    // Calculate the total price of items in the cart
    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        loadCartData(); // Load the cart items on component mount
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container cart-container">
                <h3>Your Cart</h3>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-card" key={item._id}>
                                <img
                                    src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2zDNvFIFdrq77npwYU1DSpE9jZHdNOK-ow&s"}
                                    alt={item.name}
                                    className="cart-item-img"
                                />
                                <div className="cart-item-details">
                                    <h5 className="cart-item-name">{item.foodItemId.name}</h5>
                                    <p><strong>Type:</strong> {item.foodItemId.type}</p>
                                    <p><strong>Cuisine:</strong> {item.foodItemId.cuisine}</p>
                                    <p><strong>Description:</strong> {item.foodItemId.description}</p>
                                    <p><strong>Price:</strong> ${item.foodItemId.price}</p>
                                    <p><strong>Quantity:</strong> {item.quantity} </p>
                                    {/*<button*/}
                                    {/*    className="btn btn-danger"*/}
                                    {/*    onClick={() => handleRemoveFromCart(item.foodItemId._id)}*/}
                                    {/*>*/}
                                    {/*    Remove*/}
                                    {/*</button>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="cart-total">
                    <h4>Total: ${totalPrice.toFixed(2)}</h4>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
