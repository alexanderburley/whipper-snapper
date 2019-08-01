const nav = require("./Nav");
module.exports = class Home {
  constructor() {
    this.prepend = `
   <!DOCTYPE html>
    <html>
    ${head}
    ${bodyPrePend}
    ${nav.build()}
  
   `;

    this.postpend = `
      </div>
    </body>
   </html>
   `;

    this.body = "";
  }

  injectPost(post) {
    this.body += `
    <div class="card>
      <div class="card-body">
          <h5 class="card-title"><a href="./${post.title}.html">${
      post.title
    }</a></h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
      </div>
    </div>
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

const head = `<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>`;
const bodyPrePend = `<body>
<div class="container">
<h1>The Blog</h1>
<hr>`;

