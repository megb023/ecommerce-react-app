import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders E-Commerce Store header', () => {
  render(<App />);
  const headerElement = screen.getByText(/E-Commerce Store/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Home button', () => {
  render(<App />);
  const homeButton = screen.getByText(/Home/i);
  expect(homeButton).toBeInTheDocument();
});

test('renders Cart button', () => {
  render(<App />);
  const cartButton = screen.getByText(/Cart/i);
  expect(cartButton).toBeInTheDocument();
});