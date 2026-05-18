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
    localStorage.setItem('theme', 'light');
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

  test('cycles theme light -> dark and updates root class + localStorage', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    // theme starts as 'light'; sr-only text includes "theme_light"
    const themeButton = screen.getByRole('button', { name: /theme_switch/i });
    await user.click(themeButton);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(mocks.trackEventMock).toHaveBeenCalledWith('theme_switch', { theme: 'dark' });
  });

  test('updates font scale variable when size controls are used', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const increaseBtn = screen.getByRole('button', { name: 'font_increase' });
    await user.click(increaseBtn);

    expect(Number(localStorage.getItem('fontScale'))).toBeCloseTo(1.05, 2);
    expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1.05');
  });
});
