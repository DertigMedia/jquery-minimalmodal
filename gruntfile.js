module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {},
			build: {
				src: 'jquery.minimodal.js',
				dest:'jquery.minimodal.min.js'
			}
		},
		cssmin: {
			target: {
				files: {
					'jquery.minimodal.min.css': ['minimodal.css']
				}
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['uglify', 'cssmin']);
	
};