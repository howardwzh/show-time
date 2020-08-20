var gulp = require('gulp')
var fs = require('fs')
var replace = require('gulp-replace')
var log = require('fancy-log')

gulp.task('insert', function(){
    return new Promise(function(resolve) {
        getJsCodes((jsCodes) => insertJsCodesToHtml(jsCodes, resolve))
    })
})

function getJsCodes(cb) {
    fs.readFile('./dist/js/app.js', function(err, buf) {
        cb(buf.toString())
    })
}

function insertJsCodesToHtml(jsCodes, resolve) {
    gulp.src(`./dist/index.html`)
        .pipe(replace('<link rel=icon href=favicon.ico>', ''))
        .pipe(replace('<link href=js/app.js rel=preload as=script>', ''))
        .pipe(replace('<script src=js/app.js></script>', `<script>${jsCodes}</script>`))
        .pipe(gulp.dest('./dist/'))
        .on('end', function(){
            log('Js codes has insert to index.html')
            resolve()
        })
}