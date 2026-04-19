import '@testing-library/jest-dom'
// Mock next/image if needed, but we're not using it in this project
// ResizeObserver mock for jsdom
const localStorageState = new Map()

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key) => localStorageState.get(key) || null,
    setItem: (key, value) => localStorageState.set(key, String(value)),
    removeItem: (key) => localStorageState.delete(key),
    clear: () => localStorageState.clear(),
  },
  configurable: true,
})

class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})

HTMLCanvasElement.prototype.getContext = () => ({
  setTransform: () => {},
  clearRect: () => {},
  createLinearGradient: () => ({ addColorStop: () => {} }),
  fillRect: () => {},
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
})
