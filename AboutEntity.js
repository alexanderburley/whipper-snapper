const Entity = require("./Entity");
let prepend = "";
let postpend = "";
let content = `
  <p> I am Alex Burley </p>
`;
module.exports = () => Entity(prepend, content, postpend);
