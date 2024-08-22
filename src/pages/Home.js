import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

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
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
}
  
  export default Home;
