from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

app = Flask(__name__)

# Configure CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cart.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define CartItem model
class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'name': self.name,
            'price': self.price,
            'quantity': self.quantity
        }

@app.route('/cart', methods=['GET', 'POST', 'DELETE', 'OPTIONS'])
def manage_cart():
    if request.method == 'OPTIONS':
        return '', 200
    if request.method == 'GET':
        cart_items = CartItem.query.all()
        return jsonify([item.to_dict() for item in cart_items])
    
    elif request.method == 'POST':
        item = request.json
        quantity = int(item.get('quantity', 1))  # Get quantity from request, default to 1 if not provided
        existing_item = CartItem.query.filter_by(product_id=item['id']).first()
        if existing_item:
            existing_item.quantity += quantity  # Add the new quantity to the existing quantity
        else:
            new_item = CartItem(
                product_id=item['id'], 
                name=item['name'], 
                price=item['price'], 
                quantity=quantity  # Use the quantity from the request
            )
            db.session.add(new_item)
        db.session.commit()
        return jsonify([item.to_dict() for item in CartItem.query.all()]), 201
    
    elif request.method == 'DELETE':
        CartItem.query.delete()
        db.session.commit()
        return '', 204

@app.route('/cart/<int:item_id>', methods=['PUT', 'DELETE', 'OPTIONS'])
def manage_cart_item(item_id):
    if request.method == 'OPTIONS':
        return '', 200
    
    item = CartItem.query.get_or_404(item_id)
    
    if request.method == 'PUT':
        data = request.json
        item.quantity = int(data.get('quantity', item.quantity))
        db.session.commit()
        return jsonify(item.to_dict()), 200
    
    elif request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return '', 204

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='127.0.0.1', port=5000)