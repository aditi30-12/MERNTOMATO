import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import { Carousel } from '../Components/Carousel';
import {useCart} from "../context/CartContext";

export default function Home() {
    // const [foodCategory, setFoodCategory] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [user, setUser] = useState(null);
    const { addToCart } = useCart();
    // Fetch data from the API
    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data); // log the response for debugging
            setFoodItems(data); // Store fetched data in state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData(); // Call loadData on component mount

        // Check if user is logged in (by checking auth token)
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const decodedUser = JSON.parse(atob(authToken.split('.')[1]));
            setUser(decodedUser); // Set user data from JWT
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className="m-3">
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <Card
                            key={item._id}
                            foodItemId={item._id}
                            name={item.name}
                            type={item.type}
                            cuisine={item.cuisine}
                            ingredients={item.ingredients}
                            price={item.price}
                            description={item.description}
                            onAddToCart={addToCart}
                            isLoggedIn={!!user}
                        />
                    ))
                ) : (
                    <p>Loading food items...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
