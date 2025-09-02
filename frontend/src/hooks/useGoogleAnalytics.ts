// src/hooks/useGoogleAnalytics.ts
import { useEffect } from 'react';
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-3QJS5V9271';

export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Cargar script gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
};
