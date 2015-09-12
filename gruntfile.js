 module.exports = function(grunt) {

 	// Project configuration
 	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),

 		/******************************************************************************
		*
		* Stylesheet 처리
		*
		******************************************************************************/
		
		// sass 변환
		sass: {
			main: {                
			      options: {
			        	style: 'expanded',
			        	sourcemap: 'none'
			      },
			      files: {
			        	'test/style/style.css': 'src/sass/main.scss'
			      }
			}
		},

		// css 압축 처리 - build version
		cssmin: {
			options: {
			    	keepSpeicalComments: 0,
			},
			minify: {
			    	src: 'test/style/style.css',
			    	dest: 'build/style/style.min.css'
			}
		},

		/******************************************************************************
		*
		* Javascript 처리
		*
		******************************************************************************/

		// react jsx transform & dependency control
		browserify: {
		     	options: {
		     		transform: [ require('grunt-react').browserify ]
		     	},
		     client: {
			     src: ['src/jsx/**/*.jsx'],
			     dest: 'test/script/app.js'
		     }
		},

		// 스크립트 난독화 및 압축 처리 - build version
		uglify: {
		    	options: {
		    	 	mangle: false,
		    	 	compress: true,
		    	 	preserveComments: false
		    	},
		   	react: {
	        		src: 'test/script/app.js',
	        		dest: 'build/script/app.min.js'
		    	}
		},

		/******************************************************************************
		*
		* Web Server 처리 
		*
		******************************************************************************/

		//  Test version / Build version setting
		connect: {
			// Test version server
			test: {
			      options: {
			        	port: 9001,
			        	base: 'test/',
			        	open: true,
			        	livereload: true
			      }
			},
			// build version server
			server: {
			      options: {
			        	port: 9001,
			        	base: 'build/',
			        	open: true,
			        	keepalive: true
			      }
			}
		},

		// 파일 수정 시, 컴파일 후 브라우저에 반영
		watch: {
		      // sass 파일 수정/추가 시 동작
		      sass: {
		        	files: 'src/sass/**/*.scss',
		        	tasks: ['sass'],
		        	options: {
			      	livereload: true
			    	}
		      },
		      // react 파일 수정/추가 시 동작
		      react: {
		        	files: 'src/jsx/**/*.jsx',
		        	tasks: ['browserify'],
		        	options: {
			      	livereload: true
			    	}
		      }
		},

 	});

 	// loadNpmTasks
 	grunt.loadNpmTasks('grunt-contrib-sass');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');
    	grunt.loadNpmTasks('grunt-browserify');
    	grunt.loadNpmTasks('grunt-contrib-uglify');
    	grunt.loadNpmTasks('grunt-contrib-connect');
    	grunt.loadNpmTasks('grunt-contrib-watch');

    	 /******************************************************************************
	*
	* 구동 명령
	*
	* $ grunt 			: Test version compile & run server
	* $ grunt build 		: Build version compile and no server
	* $ grunt run 		: Build version compile and run server
	*
	******************************************************************************/

    	// registerTasks
    	grunt.registerTask('default', ['sass', 'browserify', 'connect:test', 'watch']);
    	grunt.registerTask('build', 	['sass', 'browserify', 'cssmin', 'uglify']);
    	grunt.registerTask('run', 	['sass', 'browserify', 'cssmin', 'uglify', 'connect:server']);
 };