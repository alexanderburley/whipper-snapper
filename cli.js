#!/usr/bin/env node

const { program } = require("commander");
const { join } = require("path");
const builder = require("./build");

program.version(require("./package.json").version);

program.option("-s, --source <source>", "/Users/Alex/src/blog", process.cwd());
program.option("-d, --destination <destination>", "/Users/Alex/src/blog/out/", process.cwd());
program
  .command("build")
  .description("Build your website")
  .action(() => {
    builder(join(process.cwd(), program.source), join(process.cwd(), program.destination));
  });

program.parse(process.argv);
