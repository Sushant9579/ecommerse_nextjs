// types/paytm.d.ts
export {};

declare global {
  interface Window {
    Paytm: {
      CheckoutJS: {
        onLoad: (callback: () => void) => void;
        init: (config: any) => Promise<void>;
        invoke: () => void;
      };
    };
  }
}
