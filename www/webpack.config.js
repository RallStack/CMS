var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('js/custom', './assets/js/custom.js')
    .addStyleEntry('css/custom', './assets/scss/custom.scss')

    // Add bootstrap 4.0.0
    .addStyleEntry('css/bootstrap4', './assets/scss/bootstrap4.scss')

    .addStyleEntry('css/general', './assets/scss/general.scss')
    .addStyleEntry('css/admin', './assets/scss/admin.scss')
    .addStyleEntry('css/client', './assets/scss/client.scss')
    .addStyleEntry('css/displayContenu', './assets/scss/displayContenu.scss')

    // uncomment if you use Sass/SCSS files
    .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    // .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
