// Safeguard window.fetch if it is a getter-only property to prevent polyfill assignment errors
if (typeof window !== 'undefined' && window.fetch) {
  try {
    let currentFetch = window.fetch;
    const patch = {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(fn: any) {
        if (typeof fn === 'function') {
          currentFetch = fn;
        }
      },
    };

    if (typeof Window !== 'undefined' && Window.prototype && Object.getOwnPropertyDescriptor(Window.prototype, 'fetch')) {
      Object.defineProperty(Window.prototype, 'fetch', patch);
    } else {
      Object.defineProperty(window, 'fetch', patch);
    }
  } catch (e) {
    // Ignore if property is non-configurable
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
