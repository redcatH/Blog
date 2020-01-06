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

function getFileHttps(hostname, filepath, dist, decompressDist) {
    console.log(filepath);
    var options = {
        hostname: hostname,
        port: 443,
        path: filepath,
        method: 'GET'
    }
    var file = fs.createWriteStream(dist);
    var req = https.request(options, (res) => {

        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
        res.on('data', (d) => {
            file.write(d);
        }).on('end', () => {console.log('解压0');
            if (decompressDist) {
                console.log('解压');
                gulp.src(dist)
                    .pipe(decompress({ strip: 1 }))
                    .pipe(gulp.dest(decompressDist));
            }
        });
    })

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

gulp.task('changetheme', (cb) => {
    getFileHttps('codeload.github.com',
        '/redcatH/' + themeRepoName + '/zip/master',
        './' + themeName + '.zip',
        './themes/' + themeName);
})


gulp.task('test', (cb) => {
    // options = {
    //     hostname: 'codeload.github.com',
    //     port: 443,
    //     path: '/redcatH/hexo-theme-polarbear/zip/master',
    //     method: 'GET'
    // };
    getFileHttps('codeload.github.com',
    '/redcatH/' + themeRepoName + '/zip/master',
    './' + themeName + '.zip',
    './themes/' + themeName);
    cb();
});