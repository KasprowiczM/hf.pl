import '@testing-library/jest-dom'

const localStorageState = new Map()
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key) => localStorageState.get(key) ?? null,
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

class IntersectionObserver {
  // eslint-disable-next-line no-unused-vars
  constructor(_callback, _options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver = IntersectionObserver
globalThis.IntersectionObserver = IntersectionObserver
if (typeof global !== 'undefined') global.IntersectionObserver = IntersectionObserver

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
  fillText: () => {},
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
  measureText: () => ({ width: 0 }),
})
