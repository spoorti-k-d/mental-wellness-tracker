import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link when App component is rendered with valid props', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).not.toBeNull();
  expect(linkElement.textContent).toBe('Learn React');
});

test('renders learn react link when App component is rendered with null props', () => {
  render(<App nullProps />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).not.toBeNull();
  expect(linkElement.textContent).toBe('Learn React');
});

test('renders learn react link when App component is rendered with undefined props', () => {
  render(<App undefinedProps />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).not.toBeNull();
  expect(linkElement.textContent).toBe('Learn React');
});

test('renders error message when App component is rendered with invalid props', () => {
  render(<App invalidProps />);
  const errorMessage = screen.getByText(/error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).not.toBeNull();
  expect(errorMessage.textContent).toBe('Error: Invalid props');
});