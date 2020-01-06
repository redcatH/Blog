var exec = require('child_process').exec;
var gulp = require('gulp');
var fs = require('fs');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var https = require('https');
var decompress = require('gulp-decompress');

gulp.task('default', function () {
    console.log("https://14122.com")
});

var themeRepoName = 'hexo-theme-polarbear';
var themeName = 'polarbear';

function getFileHttps(hostname, path, dist, decompressDist) {
    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'get'
    }
    //    ./themes/
    var file = fs.createReadStream(dist);

    var req = https.request(options, (res) => {
        console.Console("statuscode:", res.statusCode);
        res.on('on', (d) => {
            file.write(d)
        }).on('end',()=>{
            if(decompressDist){
                gulp.src(dist).pipe(decompress({strip:1}))
                .pipe(gulp.dest(decompressDist))
            }
        })
    })
}

gulp.task('changetheme',(cb)=>{
    getFileHttps('github.com',
    '/redcatH/'+themeRepoName+'/zip/master',
    './'+themeName+'.zip',
    './'+themeName);
})
// https://github.com/redcatH/hexo-theme-polarbear/archive/master.zip