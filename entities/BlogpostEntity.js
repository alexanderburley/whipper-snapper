const Entity = require("./Entity");
let prepend = "";
let postpend = "";

let content = (title, html) => {
  return `
    <h1>${title}</h1>
    <hr>
    ${html}
  `;
};

module.exports = (title, html) =>
  Entity(prepend, content(title, html), postpend);
