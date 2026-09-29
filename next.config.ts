import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob: https://images.prismic.io",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://static.cdn.prismic.io",
      "connect-src 'self' https://*.prismic.io",
      'frame-src https://*.prismic.io',
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'self' https://*.prismic.io",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
