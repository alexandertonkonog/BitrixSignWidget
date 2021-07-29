const path = require('path');

module.exports = {
    entry: './src/index.js', 
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'UMC-widget.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
      
};