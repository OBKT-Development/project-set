module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  //gruntパッケージの読込
  for (taskName in pkg.devDependencies) {
    if (taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }


  grunt.initConfig({

    sass: {
      options: {
        style: 'expanded'
      }
      styles: {
        src: 'assets/sass/core.scss',
        dest: 'assets/styles/core.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      file: {
        expand: true,
        flatten: true,
        src: 'assets/styles/*.css',
        dest: 'assets/styles/'
      },
    },

    esteWatch: {
      options : {
        dirs : [
          'assets/sass/*',
          'assets/sass/'
        ],
        livereload : {
          enabled : true,
          extensions : ['js', 'scss', 'css', 'html']
        }
      },

      scss : function(src) {
        if (src.match(/.scss$/) ) {
          src = '/**/*.scss';
        }
        return ['sass','autoprefixer'];
      }
    },

    connect : {
      dev : {
        options: {
          port     : 9000,
          hostname : '0.0.0.0',
          base     : '',
          open     : 'http://0.0.0.0:9000/'
        }
      }
    }


  });


  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'connect',
    'esteWatch'
  ]);
};