module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');

	//gruntパッケージの読込
	for (taskName in pkg.devDependencies) {
		if (taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	function updateCompileSrc(type, src) {
		cwd = grunt.config.get(type + '.compile.files.0.cwd');
		src = src.replace(cwd+'/', '');
		grunt.config.set(type+'.compile.files.0.src', src);
		return type + ':' + 'compile';
	}

	function updateCopySrc(ext, src) {
		cwd = grunt.config.get('copy.'+ext+'.cwd');
		src = src.replace(cwd+'/', '');
		grunt.config.set('copy.'+ext+'.src', [src]);
		return 'copy:' + ext;
	}


	grunt.initConfig({

		pkg : pkg,

		dir : {
			// ソースディレクトリ
			src : 'src'

			// 出力ディレクトリ
			,dev : 'dev'

			// 一時ディレクトリ
			,temp : 'temp'

			// includeされたhtmlの一時ディレクトリ
			,temp_html : '<%= dir.temp %>'

			// assetsの一時ディレクトリ
			,temp_assets : '<%= dir.temp %>/assets'

			// コンパイル済みCSS
			,temp_css : '<%= dir.temp_assets %>/styles'

			// JS
			,temp_js : '<%= dir.temp_assets %>/scripts'

			// ディレクトリ名
			,js       : 'scripts'
			,sass     : 'sass'
			,css      : 'styles'
			,html     : 'html'
			,img      : 'images'
			,includes : 'includes'
			,assets   : 'assets'
		},

		esteWatch: {
			options : {
				dirs : [
					 '<%= dir.src %>/'
					,'<%= dir.src %>/**/'
					,'<%= dir.temp %>/'
					,'<%= dir.temp %>/**/'
				],

				livereload : {
					enabled : true,
					extensions : ['js', 'scss', 'css', 'html', 'img']
				}
			},

			scss : function(src) {
				// インクルードファイルの場合は、すべてコンパイル
				if (src.match(/\/_.+\.scss$/) ) {
					src = '**/*.scss';
				}
				return [updateCompileSrc('sass', src), updateCopySrc('css', '**/*.css')];
			},

			html : function(src) {
				if (src.match(/\includes\//)) {
					return [updateCompileSrc('includes', '**/*.html'), updateCopySrc('html', '**/*.html')];
				} else {
					return [updateCompileSrc('includes', src), updateCopySrc('html', '**/*.html')];
				}
			},

			js : function(src) {
				return updateCopySrc('js', src);
			},

			img : function(src) {
				return updateCopySrc('img', src);
			}
		},

		clean : {
			dev : {
				src : ['<%= dir.dev %>', '<%= dir.temp %>/**']
			}
		},

		includes: {
			compile: {
				options: {
					flatten     : true,
					includePath : '<%= dir.src %>/<%= dir.assets %>/<%= dir.includes %>'
				},
				files : [{
					expand : true,
					cwd    : '<%= dir.src %>',
					src    : ['**/*.html'],
					dest   : '<%= dir.temp_html %>',
					filter : function(src) {
						return !src.match(/\includes\//);
					}
				}]
			}
		},

		sass: {
			compile : {
				options: {
					sourcemap : 'file',
					style: 'expanded'
				},
				files : [{
					expand : true,
					cwd    : '<%= dir.src %>/<%= dir.assets %>/<%= dir.sass %>',
					src    : '**/*.scss',
					dest   : '<%= dir.temp_css %>',
					ext    : '.css'
				}]
			}
		},

		copy : {
			// 個別コピー
			js : {
				expand : true,
				cwd    : '<%= dir.src %>/<%= dir.assets %>/<%= dir.js %>',
				src    : ['**/*.js'],
				dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.js %>'
			},
			css : {
				expand : true,
				cwd    : '<%= dir.temp_css %>',
				src    : [],
				dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.css %>'
			},
			html : {
				expand : true,
				cwd    : '<%= dir.temp_html %>',
				src    : [],
				dest   : '<%= dir.dev %>'
			},
			img : {
				expand : true,
				cwd    : '<%= dir.src %>/<%= dir.assets %>/<%= dir.img %>',
				src    : ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
				dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.img %>'
			},

			// 一括コピー
			dev : {
				files : [{
					expand : true,
					cwd    : '<%= dir.src %>/<%= dir.assets %>/<%= dir.js %>',
					src    : ['**/*.js'],
					dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.js %>'
				}, {
					expand : true,
					cwd    : '<%= dir.temp_css %>',
					src    : ['**/*.css'],
					dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.css %>'
				}, {
					expand : true,
					cwd    : '<%= dir.src %>/<%= dir.assets %>/<%= dir.img %>',
					src    : ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
					dest   : '<%= dir.dev %>/<%= dir.assets %>/<%= dir.img %>'
				}, {
					expand : true,
					cwd    : '<%= dir.temp_html %>',
					src    : ['**/*.html'],
					dest   : '<%= dir.dev %>'
				}]
			}
		},

		connect : {
			dev : {
				options: {
					port     : 9005,
					hostname : '0.0.0.0',
					base     : '<%= dir.dev %>',
					open     : true
				}
			}
		}
	});


	grunt.registerTask('default', [
		'clean:dev'

		// css
		,'sass:compile'

		// html
		,'includes:compile'

		,'copy:dev'

		,'connect:dev'
		,'esteWatch'
	]);
};