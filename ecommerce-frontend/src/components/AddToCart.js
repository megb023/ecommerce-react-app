import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

const AddToCartButton = ({ product, quantity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to add to cart:', product, 'Quantity:', quantity);
      const response = await fetch('http://127.0.0.1:5001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: quantity
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCart = await response.json();
      console.log('Item added to cart:', updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message || 'An error occurred while adding to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        data-test="addToCart" 
        primary 
        size="large" 
        icon 
        labelPosition="left" 
        onClick={addToCart}
        loading={isLoading}
        disabled={isLoading}
      >
        <Icon name="cart plus" />
        Add to Cart ({quantity})
      </Button>
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
};

export default AddToCartButton;