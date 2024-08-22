import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <header>
            <nav>
                <Link to ="/">Home</Link>
                <Link to="/cart">Cart</Link>
            </nav>
            <input type="text" placeholder="Search products..."/>
            <Link to="/cart">
                <span>Cart (0)</span>
            </Link>
        </header>
    );
}

export default Header;