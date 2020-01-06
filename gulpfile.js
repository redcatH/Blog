// var exec = require('child_process').exec;
var gulp = require('gulp');
var fs = require('fs');
// var git = require('gulp-git');
// var runSequence = require('run-sequence');
var https = require('https');
var decompress = require('gulp-decompress');

gulp.task('default', function () {
    console.log("https://14122.com")
});

var themeRepoName = 'hexo-theme-polarbear';
var themeName = 'polarbear';

function getFileHttps(hostname, path, dist, decompressDist) {
    console.log(path);
    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'get'
    }
    var file = fs.createReadStream(dist);
    try {
        var req = https.request(options, (res) => {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            res.on('data', (d) => {
                file.write(d);
            }).on('end', () => {
                if (decompressDist) {
                    gulp.src(dist)
                        .pipe(decompress({ strip: 1 }))
                        .pipe(gulp.dest(decompressDist));
                }
            }).on.on('error',(error)=>{
                console.log('error'+error);
            })
        })
        req.end();
    } catch (error) {
        console.log(error);
    }

}

gulp.task('changetheme', (cb) => {
    getFileHttps('codeload.github.com',
        '/redcatH/' + themeRepoName + '/zip/master',
        './' + themeName + '.zip',
        './' + themeName);
})

// getFileHttps('codeload.github.com',
//     '/redcatH/' + themeRepoName + '/zip/master',
//     './' + themeName + '.zip',
//     './' + themeName);
// https://github.com/redcatH/hexo-theme-polarbear/archive/master.zip