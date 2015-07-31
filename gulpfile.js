/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
var babel = require('gulp-babel');
// Config
var config = require("config");
var clean = require('gulp-contrib-clean');


var DEBUG = process.env.NODE_ENV === "development";

gulp.task('clean', function() {
    gulp.src(config.get("deploy.output.deploy"))
        .pipe(clean());
});

gulp.task("copy-source", ["clean"], function () {
    gulp.src("src/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src"));
    gulp.src(["package.json", "index.js", "bootstrap.js"])
        .pipe(gulp.dest(config.get("deploy.output.app")));
    return gulp.src("config/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/config"));
});

gulp.task("copy-deployfiles",["copy-source"],function () {
    return gulp.src("deploy/*")
        .pipe(gulp.dest(config.get("deploy.output.deploy")));
});

gulp.task("copy-to-buildDir", ["copy-deployfiles"], function () {
    return gulp.src(config.get("deploy.output.deploy")+"/**")
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));
});

gulp.task("deploy",["clean", "copy-to-buildDir"]);


