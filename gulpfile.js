'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const minifyHTML = require('gulp-htmlmin');
const file_include = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const order = require('gulp-order');
const saveLicense = require('uglify-save-license');
const inject = require('gulp-inject-string');
const headerfooter = require('gulp-headerfooter');

let sass_root = "";
let sass_dest = "";

//***********
//*** CSS ***
//***********

//CSS Process:
// 1) Compile each breakpoint seperatly in a single file 
// 2) Merge compiled breakpoint SCSS files into 2 files (Global CSS + Module CSS)
// 3) Convert SCSS files to CSS files
// 4) Merge the 2 CSS files


//1) Compile each breakpoint seperatly in a single file

//Mobile is standard files - Mobile First Approach
gulp.task('compile_mobile', function(done) {
  return gulp.src([sass_root+'*.scss',
                        '!'+sass_root+'@desktop.scss',
                        '!'+sass_root+'@laptop.scss',
                        '!'+sass_root+'@tablet.scss']).pipe(order()) //alphabetically by hierarchy
        .pipe(concat('____module.scss'))
        .pipe(gulp.dest('./dest/_global/scss/'));
});

gulp.task('compile_tablet', function(done) {
  return gulp.src([sass_root+'@tablet.scss'])
        .pipe(concat('___tablet.scss'))
        .pipe(inject.prepend('@media (min-width: 600px) {'))
        .pipe(inject.append('}'))
        .pipe(gulp.dest('./dest/_global/scss/'));
});

gulp.task('compile_laptop', function(done) {
  return gulp.src([sass_root+'@laptop.scss'])
        .pipe(concat('__laptop.scss'))
        .pipe(inject.prepend('@media (min-width: 1023px) {'))
        .pipe(inject.append('}'))
        .pipe(gulp.dest('./dest/_global/scss/'));
});


gulp.task('compile_desktop', function(done) {
  return gulp.src([sass_root+'@desktop.scss'])
        .pipe(concat('_desktop.scss'))
        .pipe(inject.prepend('@media (min-width: 1279px) {'))
        .pipe(inject.append('}'))
        .pipe(gulp.dest('./dest/_global/scss/'));
});


gulp.task('compile_scss', gulp.series('compile_mobile', 'compile_tablet', 'compile_laptop', 'compile_desktop'), function(done) {
 done();
});


//2) Merge compiled breakpoint scss files into 2 files (top + mods) => (global + modules)
//this step is broken into 2 files to compile and inject css edits in each section separately
//improves performance while coding and waiting for browsersync to inject edits
gulp.task('merge_scss',function(done) {
  //merge
  var src = ['./dest/_global/scss/*.scss',
            '!./dest/_global/scss/top.scss',
            '!./dest/_global/scss/mods.scss',       
           ];
  if(sass_dest == "mods"){
     src.unshift('./src/global_top/_scss/__global_sass/**/*.scss');
  } 
  
  return gulp.src(src)
  .pipe(concat(sass_dest+".scss"))
  .pipe(gulp.dest('./dest/_global/scss/'));

});

//3) Convert SCSS files to CSS files
gulp.task('scss_to_css',function(done) {
	return gulp.src(['./dest/_global/scss/'+sass_dest+'.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat(sass_dest+".css"))
		.pipe(gulp.dest('./dest/_global/css/'));
});


//4) Merge the 2 CSS files
gulp.task('merge_css',function(done) {
  //merge
  return gulp.src(['./dest/_global/css/top.css','./dest/_global/css/mods.css'])
  .pipe(concat('style.css'))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe(gulp.dest('./dest/_global/css/'));

});


//PROCESS
//Module CSS
gulp.task('mods_sass_vars', function (done) {
  sass_root = "./src/module/**/";
  sass_dest = "mods";
  done();
});
gulp.task('mods_css',gulp.series('mods_sass_vars','compile_scss', 'merge_scss', 'scss_to_css', 'merge_css'), function (done) {
  done(); 
});

//GLOBAL CSS
gulp.task('top_sass_vars', function (done) {
  sass_root = "./src/global_top/**/**/";
  sass_dest = "top";
  done();
});

gulp.task('top_css',gulp.series('top_sass_vars','compile_scss', 'merge_scss', 'scss_to_css','mods_css'), function (done) {
  done(); 
});


//***********
//*** JS ***
//***********
gulp.task('js', function(done) {
  return gulp.src(['./src/**/*.js']).pipe(order()) //alphabetically by hierarchy

      //Transpile ES6 and churn out as widely supported "plain" javascript
      .pipe(babel({
        presets: ["@babel/preset-env"]
      }))
      //Uglify JS - Save license notice for libraries used
      .pipe(uglify({
         output: {
          comments: saveLicense
         }
        }).on('error', function(e){
           console.log(e);
       }))
      .pipe(concat('script.js'))
       //inject this gulp environment license notice
      .pipe(inject.prepend('//     (c) 2021 Kareem Bassiouni, Cheque writing demo app\n//     For all details and documentation:\n//     karimhb@gmail.com\n'))
      .pipe(gulp.dest('./dest/_global/js/'));

});



//***********
//** PAGES **
//***********
gulp.task('page', function( done) {
	return gulp.src(['./src/module/*.php'])
    .pipe(headerfooter.header('./src/module/header/header.php'))
    .pipe(headerfooter.footer('./src/module/footer/footer.php'))
    .pipe(file_include({
      prefix: '@@',
      basepath: 'src',
    }))
		.pipe(minifyHTML({
			collapseWhitespace: true,
      removeComments: true
		}))
    .on('error', console.log)
		.pipe(gulp.dest('./dest/page'));

});



//*******************
//** Build & Watch **
//*******************

gulp.task('build', gulp.series('top_css','js','page'),function(done){
  done();
});

//BrowserSync
gulp.task('browserSync', function(done) {
	browserSync.init({
  //start the server
		proxy: 'http://localhost:3040',
		host: 'localhost',
		open: false,
    port: 3016,
	});
   done();
});

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

//Watch         
gulp.task('default', gulp.series('browserSync', function() {
  
    gulp.watch(['./src/global_top/**/*.scss'], gulp.series('top_css'));
    gulp.watch(['./src/module/**/*.scss'], gulp.series('mods_css'));
    gulp.watch(['./src/**/*.js'], gulp.series('js','reload'));
    gulp.watch(['./src/**/*.php'], gulp.series('page','reload'));

}));