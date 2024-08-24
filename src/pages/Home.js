import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Grid, Card, Image } from 'semantic-ui-react';
import '../App.css';

function Home() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
      fetchProducts().then((response) => {
        setProducts(response || []);
      });
    }, []);
  
    return (
      <div>
        <Grid centered container columns={4}>
          <Grid.Row textAlign="center">
            <h1>E-Commerce Store</h1>
          </Grid.Row>
            {products.map((product) => (
            <Grid.Column key={product.id}>
                <ProductCard product={product} />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
}
  
  export default Home;
