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
        less:{
            compileLess:{
                files:{
                    'dist/scheduler.css': ['src/scheduler.less']
                }
            }
        },
        cssmin:{
            minifyCss:{
                files: {
                    'dist/scheduler.min.css': ['dist/scheduler.css']
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
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['hogan', 'concat', 'less', 'uglify', 'cssmin']);
};