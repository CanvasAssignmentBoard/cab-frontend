import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const columnListElement = screen.getByTestId("app-loaded");
  expect(columnListElement).toBeInTheDocument();
});
