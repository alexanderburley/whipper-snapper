const fs = require("fs");
const showdown = require("showdown");
const { join } = require("path");
const { HomeEntity, PageEntity, BlogpostEntity } = require("./entities");

const dateFormatLength = "YYYY-MM-DD-".length;
const converter = new showdown.Converter();
converter.setFlavor("github");

let outDir;
let assetsDir;
let postsDir;
let pagesDir;
let stylesheetsDir;

const returnPosts = () => {
  return fs.readdirSync(postsDir).map((file) => {
    const fileName = file.split(".")[0];
    const post = {
      title: fileName.substr(dateFormatLength, fileName.length).split("-").join(" "),
      url: `${fileName}.html`,
      date: fileName.substr(0, dateFormatLength - 1),
      content: converter.makeHtml(fs.readFileSync(join(postsDir, file)).toString()),
    };
    return post;
  });
};

const buildBlogPosts = (directory) => {
  returnPosts().forEach((post) => {
    fs.writeFileSync(
      join(outDir, post.url),
      PageEntity(BlogpostEntity(post).build(), directory).build()
    );
  });
};

const buildHomepage = (directory) => {
  const page = PageEntity(HomeEntity(returnPosts()).build(), directory);
  fs.writeFileSync(join(outDir, "index.html"), page.build());
};

const buildOtherPages = (directory) => {
  fs.readdirSync(pagesDir).forEach((file) => {
    const text = fs.readFileSync(join(pagesDir, file)).toString();
    const html = converter.makeHtml(text);
    const title = file.split(".")[0];
    fs.writeFileSync(join(outDir, `${title}.html`), PageEntity(html, directory).build());
  });
};

const makeDirectories = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
      if (!fs.existsSync(stylesheetsDir)) {
        fs.mkdirSync(stylesheetsDir);
      }
    }
  }
};

const buildAssets = () => {
  const stylesheets = fs.readdirSync(join(assetsDir, "stylesheets/"));
  stylesheets.forEach((file) => {
    fs.createReadStream(join(assetsDir, "stylesheets/", file)).pipe(
      fs.createWriteStream(join(outDir, file))
    );
  });
};

module.exports = (sourceDirectory, destinationDirectory) => {
  outDir = destinationDirectory || join(sourceDirectory, "docs/");
  assetsDir = join(sourceDirectory, "assets/");
  postsDir = join(sourceDirectory, "posts/");
  pagesDir = join(sourceDirectory, "pages/");
  stylesheetsDir = join(sourceDirectory, outDir, `${assetsDir}stylesheets/`);
  makeDirectories(sourceDirectory);
  buildAssets(sourceDirectory);
  buildHomepage(sourceDirectory);
  buildBlogPosts(sourceDirectory);
  buildOtherPages(sourceDirectory);
};
