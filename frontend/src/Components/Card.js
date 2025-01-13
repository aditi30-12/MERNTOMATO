import React from 'react';
import './styles.css';

export default function Card({ name, type, cuisine, ingredients, price, description, foodItemId, onAddToCart, isLoggedIn }) {
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2zDNvFIFdrq77npwYU1DSpE9jZHdNOK-ow&s"; // Static image URL

    const handleAddToCart = (itemId, quantity) => {
        if (isLoggedIn) {
            onAddToCart(itemId, quantity); // Add the food item to cart
        } else {
            alert("Please log in to add items to your cart!");
        }
    };

    return (
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={imageUrl} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text"><strong>Type:</strong> {type}</p>
                <p className="card-text"><strong>Cuisine:</strong> {cuisine}</p>
                <p className="card-text"><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
                <p className="card-text"><strong>Description:</strong> {description}</p>
                <p className="card-text"><strong>Price:</strong> ${price}</p>
                {/* Add to Cart Button */}
                <button className="btn btn-primary" onClick={() => handleAddToCart(foodItemId, 1)}>Add to Cart</button>
            </div>
        </div>
    );
}
