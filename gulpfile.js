const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const jest = require('gulp-jest').default;
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

gulp.task('scripts', () => {
	return gulp
		.src('src/scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('styles', () => {
	return gulp
		.src('src/styles/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
	return gulp
		.src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', () => {
	return gulp.src('src/**/*.test.js').pipe(jest({
		verbose: true
	}));
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: './src',
		},
		port: 3000
	});

	gulp.watch('./src/*.html').on('change', browserSync.reload);
	gulp.watch('./src/styles/*.css').on('change', browserSync.reload);
	gulp.watch('./src/scripts/*.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('scripts', 'styles', 'html', 'test'));
gulp.task('watch', () => {
	gulp.watch('src/scripts/**/*.js', gulp.series('scripts', 'test'));
	gulp.watch('src/styles/**/*.css', gulp.series('styles'));
	gulp.watch('src/**/*.html', gulp.series('html'));
	gulp.watch('src/**/*.test.js', gulp.series('test'));
});
gulp.task('default', gulp.series('scripts', 'styles', 'html', 'test', 'serve'));