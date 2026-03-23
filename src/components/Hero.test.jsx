import { render } from '@testing-library/react';
import { Hero } from './Hero';
import { describe, test, expect, vi } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Return the key as the value for simplicity
    i18n: {
      resolvedLanguage: 'pl',
      language: 'pl'
    }
  })
}));

describe('Hero', () => {
  test('renders without throwing an error', () => {
    expect(() => {
      render(<Hero />);
    }).not.toThrow();
  });

  test('renders antigravity interaction box', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('.hf-antigravity-box')).toBeInTheDocument();
  });
}); 
