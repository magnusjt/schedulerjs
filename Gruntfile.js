module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        hogan:{
            schedulerjsTemplates:{
                src : 'src/templates/layout.mustache',
                dest : 'src/templates/templates.js',
                options : { binderName: 'revealing' }
            }
        },
        concat:{
            concatTemplatesAndJs: {
                src: ['src/templates/templates.js', 'src/scheduler.js'],
                dest: 'dist/scheduler.js'
            }
        },
        uglify:{
            uglifyJs:{
                files: {
                    'dist/scheduler.min.js': ['src/templates/templates.js', 'src/scheduler.js']
                }
            }
        },
        copy:{
            copyCss:{
                src: ['src/scheduler.css'],
                dest: 'dist/scheduler.css'
            }
        },
        cssmin:{
            minifyCss:{
                files: {
                    'dist/scheduler.min.css': ['src/scheduler.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-hogan');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['hogan', 'concat', 'copy', 'uglify', 'cssmin']);
};