import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/renderer/index.tsx',
  devtool: false,
  output: {
    path: `${__dirname}/dist/renderer`,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve(`babel-loader`),
          options: {
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
            babelrc: false,
          },
        },
      },
    ],
  },
  target: 'electron11-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
    }),
  ],
};
