const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
converter.setFlavor("github");

const outDir = "./out/";
const assetsDir = "./assets/";
const postsDir = "./posts/";
const stylesheetsDir = outDir + assetsDir + "./stylesheets/";

const PostEntity = require("./PostEntity");
const HomeEntity = require("./HomeEntity");
const PageEntity = require("./PageEntity");
const BlogpostEntity = require("./BlogpostEntity");
const AboutEntity = require("./AboutEntity");
const ContactEntity = require("./ContactEntity");

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
  fs.writeFileSync(
    outDir + "about.html",
    PageEntity(AboutEntity().build()).build()
  );
  fs.writeFileSync(
    outDir + "contact.html",
    PageEntity(ContactEntity().build()).build()
  );
};

const returnPosts = () => {
  return fs.readdirSync(postsDir).map(file => PostEntity(file.split(".")[0]));
};

const makeDirectories = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
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
