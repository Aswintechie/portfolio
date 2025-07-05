import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main portfolio content', () => {
    render(<App />);

    // Check if the main content loads (using getAllByText for multiple instances)
    expect(screen.getAllByText('Aswin').length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(<App />);

    // Check if navigation links are present (test by role to avoid duplicates)
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);

    // Check for specific navigation items
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<App />);

    // Check if contact form inputs are present (using placeholder or name attributes)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
  });
});
