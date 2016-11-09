/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            full: [
                'bower_components',
                'tmp',
                'deploy'
            ],
            tidy: [
                'tmp'
            ]
        },
        'bower-install-simple': {
            production: {
                options: {
                    production: true
                }
            }
        },
        copy: {
            production: {
                files: [
                    {expand: true, src: ['bower_components/gfs-carrier-icon/*-vulcanized.html'], dest: 'tmp/', flatten: true},
                    {expand: true, src: ['**'], cwd: 'bower_components/gfs-carrier-icon/images', dest: 'deploy/images', flatten: false },
                    {expand: true, src: ['bower_components/gfs-carrier-info/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['bower_components/gfs-checkout-button/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['bower_components/gfs-checkout-widget/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['**'], cwd: 'bower_components/gfs-checkout-widget/images', dest: 'deploy/images', flatten: false },
                    {expand: true, src: ['bower_components/gfs-delivery-address/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['bower_components/gfs-droppoint/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['**'], cwd: 'bower_components/gfs-droppoint/images', dest: 'deploy/images', flatten: false },
                    {expand: true, src: ['bower_components/gfs-selected-droppoint/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['bower_components/gfs-supported-carriers/*-vulcanized.html'], dest: 'tmp/', flatten: true },
                    {expand: true, src: ['bower_components/gfs-checkout-collection/*-vulcanized.html'], dest: 'tmp/', flatten: true },
					{expand: true, src: ['bower_components/webcomponentsjs/*.js'], dest: 'deploy/webcomponentsjs', flatten: true },
 					{expand: true, src: ['bower_components/brick-common'], dest: 'deploy/brick-common', flatten: true }
               ]
            }
        },
        vulcanize: {
            production: {
                options: {
                    stripComments: true,
                    inlineCss: true,
                    inlineScripts: true,
                    absPath: 'bower_components/'
                },
                files: {
                    'bower_components/gfs-carrier-icon/gfs-carrier-icon-vulcanized.html': 'bower_components/gfs-carrier-icon/gfs-carrier-icon.html',
                    'bower_components/gfs-carrier-info/gfs-carrier-info-vulcanized.html': 'bower_components/gfs-carrier-info/gfs-carrier-info.html',
                    'bower_components/gfs-checkout-button/gfs-checkout-button-vulcanized.html': 'bower_components/gfs-checkout-button/gfs-checkout-button.html',
                    'bower_components/gfs-checkout-collection/gfs-checkout-collection-vulcanized.html': 'bower_components/gfs-checkout-collection/gfs-checkout-collection.html',
                    'bower_components/gfs-checkout-widget/gfs-checkout-widget-vulcanized.html': 'bower_components/gfs-checkout-widget/gfs-checkout-widget.html',
                    'bower_components/gfs-delivery-address/gfs-delivery-address-vulcanized.html': 'bower_components/gfs-delivery-address/gfs-delivery-address.html',
                    'bower_components/gfs-droppoint/gfs-droppoint-vulcanized.html': 'bower_components/gfs-droppoint/gfs-droppoint.html',
                    'bower_components/gfs-selected-droppoint/gfs-selected-droppoint-vulcanized.html': 'bower_components/gfs-selected-droppoint/gfs-selected-droppoint.html',
                    'bower_components/gfs-supported-carriers/gfs-supported-carriers-vulcanized.html': 'bower_components/gfs-supported-carriers/gfs-supported-carriers.html',
                }
            }
        },
        replace: {
            cloudflare: {
                options: {
                    patterns: [
                        {
                            // Images
                            match: /\/bower_components\/[^\/]+\/images\//g,   ///\/bower_components\/[^\/]+\//,
                            replacement: 'http://gfswidgetcdn.azurewebsites.net/images/'
                        },
                        {
                            // font-awesome
                            match: /..\/font-awesome\/fonts/g,
                            replacement: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/fonts'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['tmp/*-vulcanized.html'], dest: 'deploy/' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-replace');
    grunt.registerTask('default', ['clean:full', 'bower-install-simple', 'vulcanize', 'copy', 'replace', 'clean:tidy']);
    //grunt.registerTask('build-cdn-deployment', ['clean:full', 'bower-install-simple', 'vulcanize', 'copy', 'replace', 'clean:tidy']);
};
