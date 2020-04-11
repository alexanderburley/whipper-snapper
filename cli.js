#!/usr/bin/env node

const { program } = require('commander');
const builder = require('./build');
const { join } = require('path');

program.version(require('./package.json').version);
program.option('-d, --directory <directory>', '/Users/Alex/src/blog', process.cwd());
program
  .command('build')
  .description('Build your website')
  .action(() => {
    builder(join(process.cwd(), program.directory));
  });

program.parse(process.argv);
