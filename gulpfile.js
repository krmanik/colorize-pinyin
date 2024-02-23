const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const jsFiles = [
    './src/license.js',
    './src/index.js',
];

const bundleJs = () => {
    return src(jsFiles)
        .pipe(concat('colorize-pinyin.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(dest('./dist/'));
}

exports.bundleJs = bundleJs;
