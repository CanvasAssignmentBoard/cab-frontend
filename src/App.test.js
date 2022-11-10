import { render, screen } from '@testing-library/react';
import App from './App';

test('renders column list', () => {
  render(<App />);
  const columnListElement = screen.getByTestId("required-column-list");
  expect(columnListElement).toBeInTheDocument();
});
