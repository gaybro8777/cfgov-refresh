/* ==========================================================================
   Settings for webpack JavaScript bundling system.
   ========================================================================== */

const BROWSER_LIST = require( '../../../../config/browser-list-config' );
const webpack = require( 'webpack' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const path = require( 'path' );

// Constants
const COMMON_BUNDLE_NAME = 'common.js';

/* Set warnings to true to show linter-style warnings.
   Set mangle to false and beautify to true to debug the output code. */
const COMMON_MINIFICATION_CONFIG = new TerserPlugin( {
  cache: true,
  parallel: true,
  terserOptions: {
    ie8: false,
    ecma: 5,
    warnings: false,
    mangle: true,
    output: {
      comments: false,
      beautify: false
    }
  }
} );

/* Commmon webpack 'module' option used in each configuration.
   Runs code through Babel and uses global supported browser list. */
const COMMON_MODULE_CONFIG = {
  rules: [ {
    test: /\.js$/,

    /* The below regex will capture all node modules
       that start with `cf-` or `cfpb-`.
       Regex test: https://regex101.com/r/zizz3V/5 */
    exclude: /node_modules\/(?:cf\-.+|cfpb\-.+)/,
    use: {
      loader: 'babel-loader?cacheDirectory=true',
      options: {
        presets: [ [ '@babel/preset-env', {
          configPath: __dirname,
          /* Use useBuiltIns: 'usage' and set `debug: true` to see what
             scripts require polyfilling. */
          useBuiltIns: false,
          debug: false
        } ] ]
      }
    }
  }, {
    test: /\.hbs$/,
    use: {
      loader: 'handlebars-loader'
    }
  } ]
};

const COMMON_CHUNK_CONFIG = new webpack.optimize.SplitChunksPlugin( {
  name: COMMON_BUNDLE_NAME
} );

const STATS_CONFIG  = {
  stats: {
    entrypoints: false
  }
};

const conf = {
  cache: true,
  module: COMMON_MODULE_CONFIG,
  mode: 'production',
  output: {
    filename: '[name]',
    jsonpFunction: 'oah'
  },
  resolveLoader: {
    alias: {
      'handlebars-loader': path.resolve(
        __dirname, 'node_modules', 'handlebars-loader'
      )
    },
    mainFields: [ 'loader', 'main' ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    COMMON_CHUNK_CONFIG
  ],
  optimization: {
    minimizer: [
      COMMON_MINIFICATION_CONFIG
    ]
  },
  stats: STATS_CONFIG.stats
};

module.exports = { conf };
