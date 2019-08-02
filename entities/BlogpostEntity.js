const Entity = require("./Entity");
let content = (title, html) => {
  return `
    <div class="container">
      <h1>${title}</h1>
      <hr>
      ${html}
    </div>
  `;
};

module.exports = (title, html) => Entity(content(title, html));
