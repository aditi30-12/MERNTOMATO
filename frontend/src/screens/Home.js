import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card/Card';
import { Carousel } from '../Components/Carousel';

export default function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

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
  }, []);

  return (
      <div>
        <Navbar />
        <Carousel />
        <div className="m-3">
          {/* Dynamically render the cards based on the foodItems */}
          {foodItems.length > 0 ? (
              foodItems.map((item) => (
                  <Card
                      key={item._id}
                      name={item.name}
                      type={item.type}
                      cuisine={item.cuisine}
                      ingredients={item.ingredients}
                      price={item.price}
                      description={item.description}
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
