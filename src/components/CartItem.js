import React from 'react';

function CartItem({ item, removeFromCart }) {
    return (
        <div className="cart-item">
            <h3>{item.name}</h3>
            <p>Quatity: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
    );
}

export default CartItem;