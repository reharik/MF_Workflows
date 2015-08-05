/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
// Config
var config = require("config");
var del = require('del');

var DEBUG = process.env.NODE_ENV === "development";

gulp.task('clean', function(cb) {
    del([config.get("deploy.output.deploy"),
        config.get("deploy.buildDirectory")],{force:true}, cb);
});

gulp.task("copy-source",["clean"], function () {
    return gulp.src("src/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src"));
});
gulp.task("copy-root",["clean"], function () {
    return gulp.src(["package.json", "index.js", "bootstrap.js", ".npmrc"],{dot:true})
        .pipe(gulp.dest(config.get("deploy.output.app")));
});

gulp.task("copy-config",["clean"], function () {
    return  gulp.src("config/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/config"));
});

gulp.task("copy-deploy",["clean"], function () {
    return gulp.src("deploy/*")
        .pipe(gulp.dest(config.get("deploy.output.deploy")));
});

gulp.task("copy-to-buildDir",["copy-source","copy-root","copy-config","copy-deploy"], function () {
    return gulp.src(config.get("deploy.output.deploy")+"/**",{dot:true})
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));
});

////////////////////////////////////////////////////


gulp.task('clean-mf_inf', function (cb) {
    del(['src/modules/ges/**/*'], cb);
});

gulp.task('copy-mf_inf',['clean-mf_inf'], function () {
    gulp.src(['../MF_Infrastructure/compiled/src/**/*'], { "base" : "../MF_Infrastructure/compiled/src" }).pipe(gulp.dest('src/mf_Infrastructure'));
});

/////////////////////////////////////////////////

gulp.task('pull-mf_inf', ["clean-mf_inf","copy-mf_inf"]);

gulp.task("deploy",['pull-mf_inf', "copy-to-buildDir"]);
