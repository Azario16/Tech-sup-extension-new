const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    entry: {
        // main: ['@babel/polyfill', './src/cms-step/index.jsx']
        main: ['@babel/polyfill', './src/index.jsx']
    },
    output: {
        // filename: 'app.js',
        filename: 'stats-people.js',
        // path: path.resolve(__dirname, './app/cms-step')
        path: path.resolve(__dirname, './app/autofaq')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'stats-people.css',
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    },
}