const fs = require("fs").promises;
const Fs = require("fs");
const Path = require("path");
const path = "C:\\Users\\user\\Photos\\";

const folders = ["duplicated", "video", "captured"];
const files = [];

function fn(args) {
  const path_copy = path + args;
  fs.readdir(path_copy)
    .then((data) => {
      console.log(`Processing in ${path_copy}...`);
      folders.forEach((folder) => {
        const path_mkdir = path_copy + "\\" + folder;
        if (!Fs.existsSync(path_mkdir)) {
          try {
            Fs.mkdirSync(path_mkdir);
          } catch (e) {
            console.error(e);
          }
        }
      });
      data.forEach((item) => {
        files.push(item);
        const sept = Path.extname(item);
        if ([".mp4", ".mov", ".avi"].includes(sept)) {
          console.log(`move ${item} to video`);
          Fs.rename(
            path_copy + "\\" + item,
            path_copy + "\\video\\" + item,
            (error) => {
              if (error) console.error(error);
            }
          );
        } else if ([".png", ".aae"].includes(sept)) {
          console.log(`move ${item} to captured`);
          Fs.rename(
            path_copy + "\\" + item,
            path_copy + "\\captured\\" + item,
            (error) => {
              if (error) console.error(error);
            }
          );
        } else if (sept === ".jpg") {
          if (item.includes("E", 4)) {
            const str = item.replace("E", "");
            files.forEach((item) => {
              if (str === item) {
                console.log(`move ${item} to duplicated`);
                Fs.rename(
                  path_copy + "\\" + item,
                  path_copy + "\\duplicated\\" + item,
                  (error) => {
                    if (error) console.error(error);
                  }
                );
                return false;
              }
            });
          }
        }
      });
    })
    .catch(console.error);
}

fn(process.argv[2]);
