var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	ftp            = require('vinyl-ftp'),
	notify         = require("gulp-notify"),
	htmlmin 	     = require('gulp-html-minifier'),
	rsync          = require('gulp-rsync'),
	csso 		       = require('gulp-csso'),
	babel          = require('gulp-babel'),
	autopolyfiller = require('gulp-autopolyfiller'),
	merge          = require('event-stream').merge,
	order          = require("gulp-order"),
	critical       = require('critical').stream,
	csslint 			 = require('gulp-csslint'),
	sourcemaps     = require('gulp-sourcemaps'),
  jade           = require('gulp-jade');


// jade
gulp.task('jade', function() {
	return gulp.src(['blocks/**/*.jade', '!blocks/template.jade'])
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream())
});

// pug
//gulp.task('pug', function() {
//	return gulp.src(['app/pug/**/*.pug', '!app/pug/template.pug'])
//		.pipe(plumber())
//		.pipe(pug({pretty: true}))
//		.pipe(gulp.dest('app/'))
//		.pipe(browserSync.stream())
//});

// js
gulp.task('common-js', function() {
	var all = gulp.src([
		'app/js/common.js',
	])
	.pipe(babel({
		presets: ['es2015']
	}));
	var polyfills = all.pipe(autopolyfiller('polyfills.js', {
		browsers: [ 'Android 2.3',
			'Android 4',
			'Chrome 20',
			'Firefox 24',
			'ie 8',
			'ie 9',
			'iOS 6',
			'Opera 12',
			'Safari 6']
	}));
	return merge(polyfills, all)
		.pipe(order([
			'polyfills.js',
			'all.js'
		]))
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

//gulp.task('common-js', function() {
//	return gulp.src([
//		'app/js/common.js',
//	])
//	.pipe(concat('common.min.js'))
//	.pipe(uglify())
//	.pipe(gulp.dest('app/js'));
//});

//gulp.task('map-js', function() {
//	return gulp.src(['app/js/map.js'])
//		.pipe(concat('map.min.js'))
//		.pipe(uglify())
//		.pipe(gulp.dest('app/js'));
//});

//gulp.task('js', ['common-js', 'map-js'], function() {
gulp.task('js', ['common-js'], function() {
	return gulp.src([
		//'app/libs/jquery/jquery-3.3.1.min.js',
		'app/libs/fontfaceobserver/fontfaceobserver.js',
		//'app/libs/plugins-scroll/plugins-scroll.js',
		'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
		'app/libs/slick-custom/slick-custom.js',
		'app/libs/fitVids/fitVids.js',
		'app/libs/vimeo-player-js/dist/player.min.js',
		'app/libs/jQuery-EasyTabs-master/lib/jquery.easytabs.min.js',

		'app/js/new-age.js',
		'app/js/common.min.js', // Always in the end
	])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('scss', function() {
	return gulp.src('blocks/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({'bundleExec': true}).on("error", notify.onError())) // sass({outputStyle: 'expand'})
		.pipe(csso({
			restructure: false,
			sourceMap: true,
			debug: true
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		//.pipe(autoprefixer(['last 15 versions']))
		.pipe(autoprefixer([
			'Android 2.3',
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		]))
		//.pipe(cleanCSS()) // comment while develop
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

// Watch
gulp.task('watch', ['scss', 'js', 'browser-sync'], function() {
	gulp.watch('blocks/**/*.jade', ['jade']);
	gulp.watch('blocks/**/*.scss', ['scss']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js', 'app/js/new-age.js'], ['js']);
	//gulp.watch('app/*.html', browserSync.reload);
});

// Minify
gulp.task('minify', function() {
	gulp.src('app/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

// Imagemin
gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin()))    // tiny png - сжимает лучьше, но оставляет артефакты (на 3% болюше в pagespeed insights)
		.pipe(gulp.dest('dist/img'));
});

// Build tack fix-css
gulp.task('build', ['removedist', 'imagemin', 'jade', 'scss', 'js', 'minify'], function() {

	var buildFiles = gulp.src([
		//'app/*.html',
		'app/.htaccess',
	]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([  // Run Stylelint
		'app/css/main.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		'app/js/modernizr-custom.js',
		'app/js/html5shiv.min.js',
		'app/js/html5shiv-printshiv.min.js',
		//'app/js/map.min.js',
	]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
	]).pipe(gulp.dest('dist/fonts'));

});

// Csslint - Программы, предотвращающие ошибки, называются «линтерами»
gulp.task('css-lint', function() {
	gulp.src('app/css/*.css')
		.pipe(csslint())
		.pipe(csslint.formatter());
});

// Critical CSS
gulp.task('critical', function () {
	return gulp.src('dist/*.html')
		.pipe(critical({
			base: 'dist/',
			minify: true,
			width: 1023,
			height: 900,
			ignore: ['@font-face'],
			inline: true,
			css: ['dist/css/main.min.css']
		}))
		.on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
		.pipe(gulp.dest('dist/'));
});

// Deploy
gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'webdevgranchenko.esy.es',
		user:      'u715394280',
		password:  'dAf0yfAAsm8e',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
		'dist/**',
		'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
		.pipe(conn.dest('/public_html/MyResume'));  // change name of progect
});

// Rsync
gulp.task('rsync', function() {
	return gulp.src('dist/**')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			archive: true,
			silent: false,
			compress: true
		}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });
gulp.task('default', ['watch']);
