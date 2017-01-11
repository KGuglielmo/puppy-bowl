var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var del = require('del');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var paths = {
	build: {
		all: 'build'
	},
	styles: {
		all: 'src/sass/**/*.scss',
		dest: 'build/css',
		guide: 'build/styleguide'
	},
	scripts: {
		all: 'src/js/**/*.js',
		libs: 'src/js/libs/*.js',
		dest: 'build/js'
	},
	images: {
		all: 'src/images/**',
		dest: 'build/images'
	},
	fonts: {
		all: 'src/fonts/**',
		dest: 'build/fonts'
	},
	html: {
		all: 'src/html/**/*.html',
		pages: 'src/html/pages/**/*.html',
		templates: 'src/html/templates'
	}
};

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: paths.build.all
    }
  });
});

gulp.task('sass', function() {
	return gulp.src(paths.styles.all)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename('styles.min.css'))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function() {
	return gulp.src(paths.images.all)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest))
		.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('fonts', function() {
	return gulp.src(paths.fonts.all)
		.pipe(gulp.dest(paths.fonts.dest))
		.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(paths.html.pages)
    // .pipe(data(function() {
    //   return require('./src/data/data.json')
    // }))
	  // Renders template with nunjucks
	  .pipe(nunjucksRender({
	      path: [paths.html.templates]
	    }))
	  // output files in app folder
	  .pipe(gulp.dest(paths.build.all))
	  .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserify', function() {
  return browserify('src/js/app.js')
    .bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('bundle.min.js'))
    .pipe(buffer()) 
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()) 
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.styles.all, ['sass']);
  gulp.watch(paths.images.all, ['images']);
  gulp.watch(paths.fonts.all, ['fonts']);
  gulp.watch(paths.html.all, ['nunjucks']);
  gulp.watch(paths.scripts.all, ['browserify']);
});

gulp.task('clean-build', function() {
	del(paths.build.all);
});

gulp.task('default', ['sass', 'browserify', 'images', 'fonts', 'nunjucks', 'watch']);

