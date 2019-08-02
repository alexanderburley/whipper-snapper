const Entity = require("./Entity");
let prepend = "";
let postpend = "";
let content = `
  <p> Contact me </p>
`;
module.exports = () => Entity(prepend, content, postpend);
