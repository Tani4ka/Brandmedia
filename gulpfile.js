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
		babel          = require('gulp-babel'),
		autopolyfiller = require('gulp-autopolyfiller'),
		merge          = require('event-stream').merge,
		order          = require("gulp-order"),
		critical       = require('critical').stream,
		sourcemaps     = require('gulp-sourcemaps'),
		jade           = require('gulp-jade'),
		checkCSS       = require('gulp-check-unused-css'),
		purify         = require('gulp-purify-css'),
		sassLint 			 = require('gulp-sass-lint');



// JADE
gulp.task('jade', function() {
	return gulp.src(['blocks/**/*.jade', '!blocks/template.jade', '!blocks/_assets/**/*.jade'])
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream())
});

// PUG
//gulp.task('pug', function() {
//	return gulp.src(['app/pug/**/*.pug', '!app/pug/template.pug'])
//		.pipe(plumber())
//		.pipe(pug({pretty: true}))
//		.pipe(gulp.dest('app/'))
//		.pipe(browserSync.stream())
//});

// JS
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

// JS
//gulp.task('common-js', function() {
//	return gulp.src([
//		'app/js/common.js',
//	])
//	.pipe(concat('common.min.js'))
//	.pipe(uglify())
//	.pipe(gulp.dest('app/js'));
//});

// Map
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
		'app/libs/jquery.nicescroll-master/dist/jquery.nicescroll.min.js',
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

// Browser sync
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

// SCSS
gulp.task('scss', ['scss-lint'], function() {
	return gulp.src('blocks/main.scss')
		.pipe(sourcemaps.init())

		// .pipe(sass({'bundleExec': true}).on("error", notify.onError())) 
    .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))

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
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		//.pipe(cleanCSS()) // comment while develop
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

// Watch
gulp.task('watch', ['scss', 'js', 'browser-sync'], function() {
	gulp.watch('blocks/**/*.jade', ['jade']);
	gulp.watch('blocks/**/*.scss', ['scss']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js', 'app/js/new-age.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

// HTML minify
gulp.task('minify', function() {
	gulp.src('app/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

// Imagemin
gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin()))  // tiny png - сжимает лучьше, но оставляет артефакты (на 3% болюше в pagespeed insights)
		.pipe(gulp.dest('dist/img'));
});

// Check unused css - show unused css or html classes
gulp.task('unusedcss', function() {
  return gulp.src(['app/css/*.css', 'app/*.html'])
    .pipe(checkCSS());
});

// Check unused pyrify css - show unused css or html classes
// gulp.task('unusedpyrifycss', function() {
//   return gulp.src(['app/pyrify/*.css', 'app/*.html'])
//     .pipe(checkCSS());
// });

// // Pyrify css - delete unused css or html classes
// gulp.task('pyrify', function() {
//   return gulp.src('app/css/*.css')
//     .pipe(purify(['app/js/*.js', 'app/*.html']))
//     .pipe(gulp.dest('app/pyrify'));
// });

// Scsslint - Программы, предотвращающие ошибки, называются «линтерами»
gulp.task('scss-lint', function() {
  return gulp.src('blocks/components/**/*.scss')
    .pipe(sassLint({
    	rules: {
		    'no-ids': 0,    								// 0 - disabled, 1 - warning, 2 - error
		    'property-sort-order': [ 2, { 'order': 'concentric' }],
		    'class-name-format': [1, { 'convention': 'strictbem' }],
		    'no-color-literals': 0,
		    'leading-zero': [1, { include: true }],   // (0.3-true or .3-false)
		    'empty-args': [1, { include: true }],    
		    'no-transition-all': 0,   
		    'no-qualifying-elements': [1, { 'allow-element-with-attribute': true }],
		    'no-url-domains': 0,						// Domains in URLs are disallowed url('http://...')
		    'no-url-protocols': 0,					// Protocols and domains in URLs are disallowed url('http://...')
		    'force-attribute-nesting': 0,   // allow nesting attributes
		    'force-pseudo-nesting': 0,      // Class should be nested within its parent Class
		    'single-line-per-selector': 0,  // Selectors must be placed on new lines
		    'force-element-nesting': 0,      // Class should be nested within its parent Class
		    'no-vendor-prefixes': 0
		  }
    }))
    .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())    // Enter from gulp if scss-lint find errors
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

// Build 
gulp.task('build', ['removedist', 'imagemin', 'jade', 'scss', 'js', 'minify', 'pyrify'], function() {
	var buildFiles = gulp.src([
		//'app/*.html',
		'app/.htaccess',
	]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([  // Run Stylelint
		'app/css/main.min.css',   // or 'app/pyrify/main.min.css'
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
