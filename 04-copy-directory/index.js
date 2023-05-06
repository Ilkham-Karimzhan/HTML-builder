const { error } = require("console");
const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (error) => {
  if (error) return error.message;
  console.log("Директория создана!");
});

fs.readdir(
  path.join(__dirname, "files"),
  { withFileTypes: true },
  (error, data) => {
    if (error) return error.message;

    data.forEach((item) => {
      if (item.isDirectory()) return;
      const filePath = path.join(__dirname, "files", item.name);
      fs.stat(filePath, (error, stats) => {
        if (error) return console.log(error);
        fs.readFile(path.join(__dirname, "files", item.name), (error, data) => {
          if (error) return console.log(error.message);

          fs.writeFile(
            path.join(
              __dirname,
              "files-copy",
              item.name.split(".")[0] + path.extname(item.name)
            ),
            data,
            (error) => {
              if (error) return console.log(error.message);
              console.log(
                `Файл ${
                  item.name.split(".")[0] + path.extname(item.name)
                } скопирован`
              );
            }
          );
        });
      });
    });
  }
);
