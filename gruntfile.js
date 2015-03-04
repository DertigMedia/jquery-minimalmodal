module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner:'/* <%= pkg.name %> v. <%= pkg.version %> */\n'
			},
			build: {
				src: 'src/jquery.mimo.js',
				dest:'dist/jquery.mimo.min.js'
			}
		},
		cssmin: {
			target: {
				files: {
					'dist/jquery.mimo.min.css': ['src/jquery.mimo.css']
				}
			}
		},
		watch: {
			files: ['src/*'],
			tasks: ['uglify', 'cssmin']
		}	

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'cssmin']);
	
};
