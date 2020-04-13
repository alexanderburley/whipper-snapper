const fs = require("fs");
const { join } = require("path");

const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
};

module.exports = (title = "new post") => {
  const filename = `${formatDate(Date.now())}-${title.replace(" ", "-")}.md`;
  const filepath = join(process.cwd(), filename);

  if (fs.existsSync(filepath)) {
    console.log("File exists");
    process.exit(1);
  }
  fs.writeFileSync(filepath, "");
};
