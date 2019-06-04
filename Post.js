module.exports = class Post {
  constructor(title) {
    this.prepend = `
   <!DOCTYPE html>
    <html>
    <body>
    <link rel="stylesheet" type="text/css" href="github.css">
   `;

    this.postpend = `

   </body>
   </html>
   `;
    this.body = "";
    this.title = title;
  }

  inject(html) {
    this.body += html;
    return this;
  }

  build() {
    return this.prepend + this.body + this.postpend;
  }
};
