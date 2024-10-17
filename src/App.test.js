import { render, screen } from '@testing-library/react';
import App from './App';

test('renders e-commerce store title', () => {
  render(<App />);
  const titleElement = screen.getByText(/E-Commerce Store/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders home link', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
});

test('renders cart link', () => {
  render(<App />);
  const cartLink = screen.getByText(/Cart/i);
  expect(cartLink).toBeInTheDocument();
});