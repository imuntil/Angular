module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options:{
                separator:'\n',
                stripBanners:true
            },
            dist:{
                src:['js/*.js'],
                dest:'build/app.js'
            }
        },
        uglify:{
            build:{
                src:'build/app.js',
                dest:'build/app.min.js'
            },
            options:{
                stripBanners:true,
                banner: '/* \n * author: <%= pkg.author %> \n * <%= pkg.name %>-<%= pkg.version %>.js \n * date: <%= grunt.template.today("yyyy-mm-dd") %> \n */ \n'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};