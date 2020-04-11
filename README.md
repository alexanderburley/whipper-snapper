# Whipsnap

Whipsnap is a JS based content generator. With a preference towards posts and static website. This is currently a work in progress

## Install

```bash
# CLI
npm i -g whipsnap
```

```
npm i --save whipsnap
```

## Usage

Whipsnap can be used via CLI or as part of an application. You will need to configure your project in the following structure. An output directory will be created called `out/` containing a static website.

```
assets/
    stylesheets/
        whipsnap.css         Main CSS file (At present defauls to github bootstrap css)
config/
    index.js                Configuration file, usage will be describe below.
pages/
    xxx.md                  The pages directory will contain static pages which will be pulled in and able to be referenced.
posts/
    YYYY-MM-DD.md           These are `blog` posts that will be displayed on the main page.
```

_CSS_ - All CSS should go into a single file - whipper.css within the stylesheets folder.

_Configuration_ - Represented by config.js or config/index.js module.

_Navigation_ - All information will be contained within the key `navigation` and will configure the navigation bar.

```javascript
module.exports = {
  navigation: {
    brand: {
      text: 'AB',
      value: 'index',
    },
    items: [
      {
        text: 'Home',
        value: 'index',
      },
      {
        text: 'About Me',
        value: 'about-me',
      },
      {
        text: 'Contact',
        value: 'contact',
      },
    ],
  },
};
```

_Pages_ - Static pages such as `About Me` which should be written in Markdown and will be auto compiled.

_Posts_ - Will appear in a listed format on the home page.

### CLI

```
whipsnap build -d path/to/directory
```

### Node

```
require('whipsnap').build(__dirname)
```
