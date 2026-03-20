/** @type {import('next').NextConfig} */
/* eslint-disable */

const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const isDemoMode = process.env.DEMO_MODE === 'true'

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bredbandsval.se',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['@radix-ui'],
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack(config, { isServer }) {
    if (isDemoMode) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sentry/nextjs': path.resolve(__dirname, 'common/utils/sentry.stub.ts'),
      }
    }

    // Handle Node.js modules for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
        zlib: false,
        path: false,
        os: false,
        util: false,
        url: false,
        assert: false,
        buffer: false,
        process: false,
        vm: false,
        querystring: false,
        events: false,
        dns: false,
        dgram: false,
      }
    }

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  async redirects() {
    return [
      {
        source: '/signup/collect',
        destination: 'https://app.flyttsmart.se/signup/collect',
        permanent: false,
      },
      {
        source: '/fortum',
        destination: 'https://app.flyttsmart.se/fortum',
        permanent: false,
      },
      {
        source: '/Fortum',
        destination: 'https://app.flyttsmart.se/fortum',
        permanent: false,
      },
      {
        source: '/i',
        destination: 'https://app.flyttsmart.se/registration/init/',
        permanent: false,
      },
      {
        source: '/signup/init',
        destination: 'https://app.flyttsmart.se/signup/init',
        permanent: false,
      },
      {
        source: '/signup/init/:code',
        destination: 'https://app.flyttsmart.se/signup/init/:code',
        permanent: false,
      },
      {
        source: '/signup/failed',
        destination: 'https://app.flyttsmart.se/signup/failed',
        permanent: false,
      },
      {
        source: '/login/init',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/login/collect',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/login/not_exist',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/login/not_found',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/login/failed',
        destination: '/login',
        permanent: false,
      },
      {
        source: '/outdated',
        destination: '/api/outdated',
        permanent: false,
      },
      {
        source: '/movehelp',
        destination: 'https://flyttsmart.se/app/movehelp',
        permanent: false,
      },
      {
        source: '/electricity',
        destination: 'https://flyttsmart.se/app/electricity',
        permanent: false,
      },
      {
        source: '/broadband',
        destination: 'https://flyttsmart.se/app/broadband',
        permanent: false,
      },
      {
        source: '/insurance',
        destination: 'https://flyttsmart.se/app/insurance',
        permanent: false,
      },
      {
        source: '/addresschange',
        destination: 'https://flyttsmart.se/app/addresschange',
        permanent: false,
      },
      {
        source: '/profile',
        destination: 'https://app.flyttsmart.se/profile',
        permanent: false,
      },
      {
        source: '/profile/settings',
        destination: 'https://app.flyttsmart.se/profile/settings',
        permanent: false,
      },
      {
        source: '/dashboard/settings',
        destination: 'https://app.flyttsmart.se/dashboard/settings',
        permanent: false,
      },

      {
        source: '/welcome',
        destination: 'https://flyttsmart.se/app/movepage',
        permanent: false,
      },
      {
        source: '/external/modules/activities',
        destination: 'https://flyttsmart.se/app/movepage',
        permanent: true,
      },
    ]
  },
})

// Sentry config disabled for local dev
// const { withSentryConfig } = require('@sentry/nextjs')
// module.exports = withSentryConfig(module.exports, { ... })
