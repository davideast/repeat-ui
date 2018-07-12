/**
 * 
 * 1. Get component to build from command line arg
 * 2. Read not-defined.css and add tailwind statements
 * 3. Build [component].css file for component:not(defined) rule 
 * 4. Read shadow.css and add add tailwind statements
 * 5. Build [component.shadow].css
 * 6. Insert [component.shadow].css contents into component
 * 7. Uncss [component].css and [component.shadow].css against index.html
 * 8. Create centered built index.html
 * 
 */

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const uncss = require('postcss-uncss');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');
const argv = require('yargs').argv
const fs = require('fs');
const gulpSequence = require('gulp-sequence');

gulp.task('component:css', () => {
  return gulp.src([
    `src/components/${argv.component}/not-defined.css`,
    `src/components/${argv.component}/shadow.css`,
  ])
    .pipe(
      postcss([
        tailwindcss('./tailwind.js'),
        uncss({
          html: [
            `src/components/${argv.component}/index.html`,
            `src/components/${argv.component}/template.html`
          ]
        }),
      ])
    )
    // .pipe(cssnano())
    .pipe(gulp.dest(`dist/components/${argv.component}`))
});

gulp.task('copy:assets', () => {
  return gulp
    .src(['./src/assets/**/*'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('pages', () => {
  return gulp
    .src(['./src/index.html', './src/camera.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('tailwind:main', () => {
  return gulp.src(['src/repeat-ui.css'])
    .pipe(
      postcss([
        tailwindcss('./tailwind.js'),
        // uncss({
        //   html: [`src/components/${argv.component}/index.html`]
        // }),
      ])
    )
    // .pipe(cssnano())
    .pipe(gulp.dest(`dist`))
});

gulp.task('component:js', () => {
  return gulp
    .src(`src/components/${argv.component}/index.js`)
    .pipe(replace('/** SHADOW:STYLES **/', shadowStyles(argv.component)))
    .pipe(replace('<!-- SHADOW:TEMPLATE -->', shadowTemplate(argv.component)))
    .pipe(gulp.dest(`dist/components/${argv.component}`))
})

function shadowStyles(component) {
  const styles = fs.readFileSync(`dist/components/${component}/shadow.css`, 'utf8');
  return `<style>${styles}</style>`
}
function shadowTemplate(component) {
  return fs.readFileSync(`src/components/${component}/template.html`, 'utf8');
}

gulp.task('build', gulpSequence('component:css', 'component:js'));
