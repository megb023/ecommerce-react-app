import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Grid, Card, Image } from 'semantic-ui-react';


function Home() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
      fetchProducts().then((response) => {
        setProducts(response || []);
      });
    }, []);
  
    return (
      <div className="home-page">
        <h1>Product Listings</h1>
        <Grid columns={4} divided>
            {products.map((product) => (
            <Grid.Column key={product.id}>
                <Card>
                    <Image src={product.image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{product.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>${product.price}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
}
  
  export default Home;
