import React from 'react';
import {  Card, Image, CardDescription, CardMeta } from 'semantic-ui-react';
import '../App.css';



function ProductCard({ product }) {
    return (
        <Card className="product-card">
            <Image src={product.image} className="product-image" wrapped ui={false} />
            <CardMeta>
                <Card.Content className="product-content">
                    <Card.Header>{product.title}</Card.Header>
                </Card.Content>
            </CardMeta>
            <CardDescription>
                <span className='price'>${product.price}</span>
            </CardDescription>
        </Card>

    );
}

export default ProductCard;