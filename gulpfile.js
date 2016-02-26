var gulp = require('gulp'),
    addStream = require('add-stream'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    dirs = {
        assets:'restaurants/assets/',
        dist: 'restaurants/static/'
    };

gulp.task('default', ['js', 'styles']);

gulp.task('styles', function () {
    gulp.src(dirs.assets + 'scss/*.scss')
        .pipe(sass({
            //includePaths : [dirs.bootstrapScss],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        //.pipe(addStream.obj(gulp.src([
        //
        //])))
        .pipe(concat('styles.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(minifyCss())
        .pipe(gulp.dest(dirs.dist + 'css'));
});

gulp.task('js', ['vendors-js', 'app-js']);

gulp.task('app-js', function() {
    return gulp.src(dirs.assets + 'js/**/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist + 'js'));
});

gulp.task('vendors-js', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/ractive/ractive.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist + 'js'));
});

gulp.task('watch', function() {
    gulp.watch(dirs.assets + '/js/**/*.js', ['app-js']);
    gulp.watch(dirs.assets + '/scss/*.scss', ['styles']);
});