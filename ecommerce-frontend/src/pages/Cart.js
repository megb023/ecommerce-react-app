import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Icon, Grid, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../services/api';
import '../App.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (err) {
      setError('Failed to load cart. Please try again.');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    try {
      await updateCartItem(item.id, newQuantity);
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      ));
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setCart(cart.filter(item => item.id !== itemId));
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      console.error('Error removing item:', err);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body data-test="items-table">
              {cart.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell data-test="item-price">${item.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                      min="1"
                    />
                  </Table.Cell>
                  <Table.Cell data-test="item-totals">${(item.price * item.quantity).toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Button icon color="red" onClick={() => handleRemoveItem(item.id)}>
                      <Icon name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Segment>
            <Grid columns={2} stackable textAlign='center'>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column data-test="total-price">
                  <h2>Total: ${totalPrice.toFixed(2)}</h2>
                </Grid.Column>
                <Grid.Column>
                  <Button data-test="checkout-button" color="green" size="large" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      )}
    </div>
  );
}

export default Cart;