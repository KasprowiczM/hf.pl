import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Contact } from './Contact';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k) => k }),
}));

vi.mock('../lib/analytics', () => ({ trackEvent: vi.fn() }));

describe('Contact', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  test('renders mailto link and copy button', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /contact_email_label/i })).toHaveAttribute(
      'href',
      'mailto:domain@hf.pl',
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('copy button shows copied state immediately after click', async () => {
    render(<Contact />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('domain@hf.pl');

    await act(async () => {
      fireEvent.click(btn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('domain@hf.pl');
    expect(btn).toHaveTextContent('copied');
  });
});
