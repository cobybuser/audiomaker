var Encore = require('@symfony/webpack-encore');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')
    //.addEntry('page1', './assets/page1.js')
    //.addEntry('page2', './assets/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .addPlugin(new MonacoWebpackPlugin({
        languages: ['lua'],
        features: ['!accessibilityHelp', '!fontzoom', '!goToDefinitionCommands', '!iPadShowKeyboard']
    }))

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((babelConfig) => {
        babelConfig.plugins.push('@babel/plugin-proposal-class-properties');
        babelConfig.plugins.push('@babel/plugin-transform-runtime');
        babelConfig.plugins.push(["import", {
            "libraryName": "antd",
            "style": false,
        }, 'antd-import']);
        babelConfig.plugins.push(["import", {
            "libraryName": "lodash",
            libraryDirector: '',
            "camel2DashComponentName": false,
        }, 'lodash-import']);
        babelConfig.plugins.push('babel-plugin-styled-components');
        babelConfig.plugins.push('@babel/plugin-transform-template-literals');

        const preset = babelConfig.presets.find(([name]) => name === "@babel/preset-env");
        if (preset !== undefined) {
            preset[1].useBuiltIns = "usage";
            preset[1].corejs = '3.0.0';
        }
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/admin.js')
;

module.exports = Encore.getWebpackConfig();
