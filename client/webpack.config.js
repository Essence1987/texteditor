const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production': 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Editor',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
    ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: {
            loader: babel-loader,
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
