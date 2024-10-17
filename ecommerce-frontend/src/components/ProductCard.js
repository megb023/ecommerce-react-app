import React from 'react';
import { Card, Image, CardContent, CardHeader } from 'semantic-ui-react';
import '../App.css';

function ProductCard({ product }) {
    return (
        <Card className="product-card">
            <div className="image-container">
                <Image src={product.image} className="product-image" />
            </div>
            <CardContent className="product-content">
                <CardHeader>{product.title}</CardHeader>
                <span className='price'>${product.price.toFixed(2)}</span>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
