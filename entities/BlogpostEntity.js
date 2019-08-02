const Entity = require("./Entity");
let content = (title, html) => {
  return `
    <h1>${title}</h1>
    <hr>
    ${html}
  `;
};

module.exports = (title, html) => Entity(content(title, html));
