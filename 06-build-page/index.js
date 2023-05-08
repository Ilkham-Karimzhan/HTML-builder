const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (error) => {
  if (error) return error.message;
  console.log("Создана директория.");
});

fs.readdir(path.join(__dirname, "styles"), (error, data) => {
  if (error) return console.log(error.message);
  let content = "";
  const promises = [];
  data.forEach((item) => {
    if (path.extname(item) !== ".css") return;

    const promise = new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "styles", item), (error, styles) => {
        if (error) reject(error);
        resolve(styles.toString());
      });
    });
    promises.push(promise);
  });

  Promise.all(promises)
    .then((styles) => {
      content = styles.join("");
      fs.writeFile(
        path.join(__dirname, "project-dist", "style.css"),
        content,
        (error) => {
          if (error) return console.log(error);
          console.log("Файл успешно создан.");
        }
      );
    })
    .catch((error) => console.log(error));
});

fs.readdir(
  path.join(__dirname, "assets"),
  { withFileTypes: true },
  (error, data) => {
    if (error) return error.message;

    fs.mkdir(
      path.join(__dirname, "project-dist", "assets"),
      { recursive: true },
      (error) => {
        if (error) return console.log(error.message);
      }
    );

    data.forEach((item) => {
      if (item.isDirectory()) {
        fs.readdir(
          path.join(__dirname, "assets", item.name),
          { withFileTypes: true },
          (error, dataDeep) => {
            if (error) return console.log(error.message);

            dataDeep.forEach((itemDeep) => {
              const filePathDeep = path.join(
                __dirname,
                "assets",
                item.name,
                itemDeep.name
              );
              fs.stat(filePathDeep, (error, stats) => {
                if (error) return console.log(error);
                fs.readFile(
                  path.join(__dirname, "assets", item.name, itemDeep.name),
                  (error, data) => {
                    if (error) return console.log(error.message);

                    fs.writeFile(
                      path.join(
                        __dirname,
                        "project-dist",
                        "assets",
                        itemDeep.name.split(".")[0] +
                          path.extname(itemDeep.name)
                      ),
                      data,
                      (error) => {
                        if (error) return console.log(error.message);
                        console.log(
                          `Файл ${
                            itemDeep.name.split(".")[0] +
                            path.extname(itemDeep.name)
                          } скопирован`
                        );
                      }
                    );
                  }
                );
              });
            });
          }
        );
      }

      const filePath = path.join(__dirname, "assets", item.name);
      fs.stat(filePath, (error, stats) => {
        if (error) return console.log(error);
        fs.readFile(
          path.join(__dirname, "assets", item.name),
          (error, data) => {
            if (error) return console.log(error.message);

            fs.writeFile(
              path.join(
                __dirname,
                "project-dist",
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
          }
        );
      });
    });
  }
);
