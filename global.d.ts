/// <reference types="vite/client" /> 
/// <reference types="vite-plugin-pwa/vanillajs" />

// Stripe Buy Button custom element types
declare namespace astro.JSX {
  interface IntrinsicElements {
    'stripe-buy-button': {
      'buy-button-id'?: string;
      'publishable-key'?: string;
      class?: string;
      [key: string]: any;
    };
  }
} 