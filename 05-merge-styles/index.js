const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "styles"), (error, data) => {
  if (error) return console.log(error.message);
  let content = "";
  const promises = [];
  data.forEach((item) => {
    if (path.extname(item) !== ".css") return;
    // Каждый тик forEach это запрос к файлу, поэтому JS ждёт его ответа.
    const promise = new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "styles", item), (error, styles) => {
        if (error) reject(error);
        resolve(styles.toString());
      });
    });
    promises.push(promise);
  });
  // Просто объеденяем все ответы запросов в один файл.
  Promise.all(promises)
    .then((styles) => {
      content = styles.join("");
      fs.writeFile(
        path.join(__dirname, "project-dist", "bundle.css"),
        content,
        (error) => {
          if (error) return console.log(error);
          console.log("Файл успешно создан.");
        }
      );
    })
    .catch((error) => console.log(error));
});
