const HtmlPlugin = require("html-webpack-plugin");
const ForkTSChecker = require('fork-ts-checker-webpack-plugin');
const path = require("path");

module.exports = (env) => {
  const config = {
    mode: env.mode,
     output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build'),
      //  https://webpack.js.org/configuration/output/#outputpublicpath
      publicPath: '/'
    },
    entry: ["regenerator-runtime/runtime.js","./src/index.tsx"],
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 2 versions" } } // or whatever your project requires
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "react-hot-loader/babel"
              ]
            }
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.[s]?[ac]ss/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        // json 
        {
          test: /\.(geo|topo)json$/,
          loader: 'json-loader'
        },
        // files (non-svg-images)
        {
          test: /\.(png|jpg|gif|svg)$/i,
          type: 'asset/resource'
        },
        // txt file
        {
          test: /\.txt/,
          type: 'asset/source',
        }
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new HtmlPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
      new ForkTSChecker({
        typescript: {
          configFile: 'tsconfig.json'
        }
      })
    ],
    devServer: {
      historyApiFallback: true
    }
  };
  return config;
};
