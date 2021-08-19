const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    require('dotenv').config()

    const isProduction = env === 'production';

    return  {
        entry: './client/src/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index_bundle.js',
        },
        module: { 
            rules: [
                {
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[hash]-[name].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            fallback: {
              fs: false
            }
        },
        mode: process.env.NODE_ENV,
        devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './client/src/index.html',
            }),
        ],
    }
}