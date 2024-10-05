import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { 
  Container, 
  Grid, 
  Image, 
  Header, 
  Segment, 
  Button, 
  Loader, 
  Divider,
  Label,
  Icon,
  Input
} from 'semantic-ui-react';
import '../App.css';
import AddToCartButton from '../components/AddToCart';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then((response) => {
      setProduct(response || null);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching product:", error);
      setLoading(false);
    });
  }, [id]);

  const handleQuantityChange = (e, { value }) => {
    const newQuantity = parseInt(value);
    setQuantity(newQuantity >= 1 ? newQuantity : 1);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (loading) return <Loader active>Loading product details...</Loader>;
  if (!product) return <Container text><Header as="h2">Product not found</Header></Container>;

  return (
    <Container className="product-detail-container">
      <Segment>
        <Grid columns={2} stackable centered>
          <Grid.Column width={8}>
            <div className="product-detail-image-container">
              <Image src={product.image} alt={product.name} className="product-detail-image" />
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="product-detail-content">
              <Header as="h1" className="product-title">{product.title}</Header>
              <Divider />
              <p>{product.description}</p>
              <Divider hidden />
              <Header data-test="Price" as="h2" color="blue">
                ${parseFloat(product.price).toFixed(2)}
                <Label color="teal" size="large" attached="top right">
                  <Icon name="tag" />
                  Best Price
                </Label>
              </Header>
              <Divider hidden />
              <div className="quantity-control" style={{ marginBottom: '1rem' }}>
                <Button data-test="minusButton" icon="minus" onClick={handleDecrement} />
                <Input
                  data-test="quantity" 
                  type="number" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  min="1"
                  style={{ width: '60px', margin: '0 10px' }}
                />
                <Button data-test="plusButton" icon="plus" onClick={handleIncrement} />
              </div>
              <div className="button-group">
                <AddToCartButton product={product} quantity={quantity} />
                <Button
                  data-test="goToCart"
                  color="teal" 
                  icon 
                  labelPosition="left" 
                  onClick={handleGoToCart}
                  size="small"
                  style={{ width: 'auto' }}
                >
                  <Icon name="cart" />
                  Go to Cart
                </Button>
              </div>
              <Divider hidden />
              <Label color="orange" size="large">
                <Icon name="shipping fast" />
                Fast Shipping
              </Label>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}

export default ProductDetail;