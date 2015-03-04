module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner:'/* <%= pkg.name %> v. <%= pkg.version %> */\n'
			},
			build: {
				src: 'src/jquery.mimo.js',
				dest:'dest/jquery.mimo.min.js'
			}
		},
		cssmin: {
			target: {
				files: {
					'dest/jquery.mimo.min.css': ['src/jquery.mimo.css']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['uglify', 'cssmin']);
	
};