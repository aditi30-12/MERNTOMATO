import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

    // Fetch the cart from the backend on page load
    useEffect(() => {
        const fetchCart = async () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                const response = await fetch('http://localhost:5001/api/cart/view', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                const cartData = await response.json();
                setCart(cartData);
            }
        };

        fetchCart();
    }, []);

    // Add item to the cart
    const addToCart = async (foodItemId, quantity) => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('http://localhost:5001/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ foodItemId, quantity }),
        });

        const updatedCart = await response.json();
        setCart(updatedCart);
    };

    // Remove item from the cart
    const removeFromCart = async (foodItemId, quantity) => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return;

        const response = await fetch('http://localhost:5001/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ foodItemId, quantity: quantity }),
        });

        const updatedCart = await response.json();
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
