const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

process.on("exit", () => {
  stdout.write("Прощайте и удачи!");
});
process.on("SIGINT", () => {
  process.exit();
});

function init() {
  fs.writeFile(path.join(__dirname, "text.txt"), "", (error) => {
    if (error) console.log(error.message);
  });
}

fs.access("text.txt", fs.constants.F_OK, (error) => {
  if (error) init();

  console.log("Файл создан. Введите ваш текст: ");
});

stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "exit") process.exit();
  fs.readFile(path.join(__dirname, "text.txt"), (error, data) => {
    if (error) return console.log(error.message);
    const content = (data + chunk).toString();
    fs.writeFile(path.join(__dirname, "text.txt"), content, (error) => {
      if (error) return console.log(error.message);
      console.log("Файл успешно обновлен! Продолжайте.");
    });
  });
});
