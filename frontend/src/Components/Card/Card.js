import React from 'react';
import './styles.css'

export default function Card({ name, type, cuisine, ingredients, price, description }) {
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2zDNvFIFdrq77npwYU1DSpE9jZHdNOK-ow&s"; // Static image URL

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
                <a href="#" className="btn btn-primary">Buy Now</a>
            </div>
        </div>
    );
}
