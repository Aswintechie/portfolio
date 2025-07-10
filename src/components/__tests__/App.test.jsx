import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../App';

// Mock sessionStorage for tests
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Mock sessionStorage to prevent loading screen in tests
    mockSessionStorage.getItem.mockReturnValue('true');
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main portfolio content', async () => {
    render(<App />);

    // Wait for the loading to complete and check if the main content loads
    await waitFor(
      () => {
        expect(screen.getAllByText('Aswin').length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  });

  it('renders navigation links', async () => {
    render(<App />);

    // Wait for navigation links to be present
    await waitFor(
      () => {
        const navLinks = screen.getAllByRole('link');
        expect(navLinks.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Check for specific navigation items
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders contact section', async () => {
    render(<App />);

    // Wait for contact form inputs to be present
    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/tell me about your project/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
