const gulp = require('gulp');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// CSS preprocessing plugins
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

// JS plugins
const minify = require('gulp-minify');
const concat = require("gulp-concat");

const DIST_DIR = 'dist/';

gulp.task('sass', () => {
	return gulp.src('assets/sass/main.scss')
		.pipe(plumber({
			errorHandler: error => {
				notify.onError({
					title: `Error in ${error.plugin}`
				})(error);
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/css/'))
		.pipe(livereload());
});

gulp.task('js', () => {
	gulp.src([
		'assets/js/vendor/*.js',
		'assets/js/src/*.js',
	])
	.pipe(concat("main.js"))
	.pipe(minify({
		ext:{
			min:'.min.js'
		},
		noSource: true
	}))
	.pipe(gulp.dest('assets/js/dist/'))
	.pipe(livereload());
});

gulp.task('watch', ['sass', 'js'] , () => {
	livereload.listen();
	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/js/src/**/*.js', ['js']);
});

gulp.task('zip', ['sass', 'js'], () => {
	const {name, version} = require('./package.json');
	const filename = `${name}-${version}.zip`;

	return gulp.src([
		'**',
		'!gulpfile.js', '!README.md', '!package-lock.json',
		'!assets/sass', '!assets/sass/**',
		'!assets/js/src', '!assets/js/src/**',
		'!node_modules', '!node_modules/**',
		'!dist', '!dist/**'
	])
		.pipe(zip(filename))
		.pipe(gulp.dest(DIST_DIR));
});
