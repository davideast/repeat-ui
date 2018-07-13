const { spawn } = require('spawn-rx');
const fs = require('fs');
const { forkJoin } = require('rxjs');

const components = fs.readdirSync('./src/components');
const builds$ = components.map(c => spawn('gulp', ['build', `--component=${c}`]));

forkJoin(builds$)
  .subscribe(
    console.log, 
    console.error, 
    () => { console.log('done'); }
  );
