const Entity = require("./Entity");

const navItems = (navigation) =>
  navigation.items.reduce((acc, item) => {
    return `
    ${acc}\n
    <li class="nav-item">
      <a class="nav-link" href="./${item.value}.html">${item.text}</a>
    </li>
  `;
  }, "");

const content = (navigation) => `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="./${navigation.brand.value}.html">
      ${navigation.brand.text}
    </a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        ${navItems(navigation)}
      </ul>
    </div>
  </nav>

`;

module.exports = (navigation) => Entity(content(navigation));
