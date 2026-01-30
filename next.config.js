/** @type {import('next').NextConfig} */
/* eslint-disable */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'flyttsmart-sverige-ab',
  project: 'flyttsmart',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
