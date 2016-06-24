module.exports = function(grunt) {

    grunt.initConfig({
        // Compiles our SCSS to CSS
        sass: {
            options: {
                sourcemap: 'none',
                noCache: true
            },
            dist: {
                files: {
                    'public/main.css': 'app/stylesheets/main.scss'
                }
            }
        },
        // Do some PostCSS optimizations on our css file
        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')({
                        discardComments: {
                            removeAll: true
                        }
                    }) // minify the result
                ]
            },
            dist: {
                src: 'public/*.css'
            }
        },
        // Watch and do transformations upon file changes
        watch: {
            css: {
                files: 'app/stylesheets/*.scss',
                tasks: ['sass', 'postcss']
            }
        }
    });

    // Load the plugins that provides the tasks fxnality.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s)
    grunt.registerTask('default', ['watch']);

};
