const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
converter.setFlavor("github");

const outDir = "./out/";
const assetsDir = "./assets/";
const postsDir = "./posts/";
const pagesDir = "./pages/";
const stylesheetsDir = outDir + assetsDir + "./stylesheets/";

const dateFormatLength = "YYYY-MM-DD-".length;
const {
  PostEntity,
  HomeEntity,
  PageEntity,
  BlogpostEntity
} = require("./entities");

module.exports = () => {
  makeDirectories();
  buildAssets();
  buildHomepage();
  buildBlogPosts();
  buildOtherPages();
};

const buildBlogPosts = () => {
  fs.readdirSync(postsDir).forEach(file => {
    const text = fs.readFileSync(postsDir + file).toString();
    const html = converter.makeHtml(text);
    const title = file.split(".")[0];
    fs.writeFileSync(
      outDir + title + ".html",
      PageEntity(BlogpostEntity(title, html).build()).build()
    );
  });
};

const buildHomepage = () => {
  const page = PageEntity(HomeEntity(returnPosts()).build());
  fs.writeFileSync(outDir + "index.html", page.build());
};

const buildOtherPages = () => {
  fs.readdirSync(pagesDir).forEach(file => {
    const text = fs.readFileSync(pagesDir + file).toString();
    const html = converter.makeHtml(text);
    const title = file.split(".")[0];
    fs.writeFileSync(outDir + title + ".html", PageEntity(html).build());
  });
};

const returnPosts = () => {
  return fs.readdirSync(postsDir).map(file => {
    const fileName = file.split(".")[0];
    const title = fileName
      .substr(dateFormatLength, fileName.length)
      .split("-")
      .join(" ");
    const date = fileName.substr(0, dateFormatLength - 1);
    return PostEntity(title, date);
  });
};

const makeDirectories = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
    }
    if (!fs.existsSync(stylesheetsDir)) {
      fs.mkdirSync(stylesheetsDir);
    }
  }
};

const buildAssets = () => {
  const stylesheets = fs.readdirSync(assetsDir + "stylesheets");
  stylesheets.forEach(file => {
    fs.createReadStream(assetsDir + "stylesheets/" + file).pipe(
      fs.createWriteStream(outDir + file)
    );
  });
};
