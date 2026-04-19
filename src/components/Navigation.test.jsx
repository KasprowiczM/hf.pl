import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Navigation } from './Navigation';

const mocks = vi.hoisted(() => ({
  changeLanguageMock: vi.fn(),
  persistLanguageMock: vi.fn(),
  trackEventMock: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'pl',
      changeLanguage: mocks.changeLanguageMock,
    },
  }),
}));

vi.mock('../i18n', () => ({
  persistLanguage: mocks.persistLanguageMock,
}));

vi.mock('../lib/analytics', () => ({
  trackEvent: mocks.trackEventMock,
}));

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('language', '');
    localStorage.setItem('theme', 'system');
    localStorage.setItem('fontScale', '1');
    document.documentElement.classList.remove('dark');
    document.documentElement.style.removeProperty('--font-scale');
  });

  test('changes language and persists it', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(mocks.changeLanguageMock).toHaveBeenCalledWith('en');
    expect(mocks.persistLanguageMock).toHaveBeenCalledWith('en');
    expect(mocks.trackEventMock).toHaveBeenCalledWith('language_switch', { language: 'en' });
  });

  test('cycles theme and updates root class + localStorage', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'light');
    render(<Navigation />);

    const themeButton = screen.getByRole('button', { name: 'theme_switch' });
    await user.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(themeButton);
    expect(localStorage.getItem('theme')).toBe('system');
  });

  test('updates font scale variable when size controls are used', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const buttons = screen.getAllByRole('button', { name: /font_(decrease|increase)/ });
    await user.click(buttons[1]);

    expect(Number(localStorage.getItem('fontScale'))).toBeGreaterThan(1);
    expect(document.documentElement.style.getPropertyValue('--font-scale')).not.toBe('');
  });
});
