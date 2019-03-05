const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;

module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hust-web/react/nextjs' : '',
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    };
  },
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    return config;
  },
};
