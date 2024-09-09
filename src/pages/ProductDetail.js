import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, addToCart } from '../services/api';
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
  Icon
} from 'semantic-ui-react';
import '../App.css';
import AddToCartButton from '../components/AddToCart';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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



  if (loading) return <Loader active>Loading product details...</Loader>;
  if (!product) return <Container text><Header as="h2">Product not found</Header></Container>;

  return (
    <Container>
      <Segment>
        <Grid columns={2} stackable>
          <Grid.Column width={8}>
            <Image src={product.image} alt={product.name} fluid rounded />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h1">{product.name}</Header>
            <Divider />
            <p>{product.description}</p>
            <Divider hidden />
            <Header as="h2" color="blue">
              ${parseFloat(product.price).toFixed(2)}
              <Label color="teal" size="large" attached="top right">
                <Icon name="tag" />
                Best Price
              </Label>
            </Header>
            <Divider hidden />
            <AddToCartButton product={product} />
            <Divider hidden />
            <Label color="orange" size="large">
              <Icon name="shipping fast" />
              Fast Shipping
            </Label>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}

export default ProductDetail;