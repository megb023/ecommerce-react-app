import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';



function ProductCard({ product }) {
    return (
        <Card className="product-card">
            <Image src={product.image} className="product-image" wrapped ui={false} />
            <Card.Content className="product-content">
                <Card.Header>{product.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>${product.price}</span>
                </Card.Meta>
            </Card.Content>
        </Card>

    );
}

export default ProductCard;