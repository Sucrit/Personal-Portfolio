import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main portfolio shell', () => {
    render(<App />);

    expect(screen.getByText('Hi, Oliver here')).toBeInTheDocument();
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });
});
