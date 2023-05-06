const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (error, data) => {
    if (error) return error.message;

    data.forEach((item) => {
      if (item.isDirectory()) return;
      const filePath = path.join(__dirname, "secret-folder", item.name);
      fs.stat(filePath, (error, stats) => {
        if (error) return console.log(error);
        console.log(
          `${item.name} - ${path.extname(item.name)} - ${stats.size} bytes`
        );
      });
    });
  }
);
