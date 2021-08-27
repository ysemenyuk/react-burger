import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render home page', () => {
  render(<App />);
  const titleElement = screen.getByText(/Конструктор/i);
  expect(titleElement).toBeInTheDocument();
});
