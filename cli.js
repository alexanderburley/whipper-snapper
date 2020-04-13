#!/usr/bin/env node

const { program } = require("commander");
const { join } = require("path");
const promptly = require("promptly");

const builder = require("./build");
const generateFile = require("./scripts/createFile");

(async () => {})();

program.version(require("./package.json").version);

program.option("-s, --source <source>", "/Users/Alex/src/blog", process.cwd());
program.option(
  "-d, --destination <destination>",
  "/Users/Alex/src/blog/out/",
  process.cwd()
);
program
  .command("build")
  .description("Build your website")
  .action(() => {
    builder(
      join(process.cwd(), program.source),
      join(process.cwd(), program.destination)
    );
  });
program
  .command("new")
  .description("Generate a new post")
  .action(async () => {
    const title = await promptly.prompt("Page title: ");
    generateFile(title);
  });
program.parse(process.argv);
