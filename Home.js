module.exports = class Home {
  constructor() {
    this.prepend = `
   <!DOCTYPE html>
    <html>
    <body>
    <h1>The Blog</h1>
   `;

    this.postpend = `

   </body>
   </html>
   `;

    this.body = "";
  }

  injectPost(post) {
    this.body += `
      <a href="./${post.title}.html"> ${post.title} </a>
      <br>
    `;
    return this;
  }

  inject(html) {
    this.body += html;
    return this;
  }

  build() {
    return this.prepend + this.body + this.postpend;
  }
};
