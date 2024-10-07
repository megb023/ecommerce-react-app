import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
          <Grid.Row data-test="homepage-header" textAlign="center">
            <h1>E-Commerce Store</h1>
          </Grid.Row>
            {products.map((product) => (
            <Grid.Column data-test="item-list" key={product.id} className="hover-effect">
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
}
  
  export default Home;
