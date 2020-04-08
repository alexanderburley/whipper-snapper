const { program } = require('commander');
const builder = require('./build');

program.version(require('./package.json').version);
program.option('-d, --directory <directory>', '/Users/Alex/src/blog', process.cwd());
program
  .command('build')
  .description('Build your website')
  .action(() => {
    builder(program.directory);
  });

program.parse(process.argv);
console.log(program.directory);
