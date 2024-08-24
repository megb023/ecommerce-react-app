import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Input, Icon } from 'semantic-ui-react';
import '../App.css';

function Header() {
    return (
      <Menu fixed="top" inverted>
        <Menu.Item header as={Link} to="/">
          <Icon name="home" />
          Home
        </Menu.Item>
  
        <Menu.Item position="left">
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
  
        <Menu.Item position="right" as={Link} to="/cart">
          <Icon name="shopping cart"/>
          Cart
        </Menu.Item>
      </Menu>
    );
  }
  
  export default Header;