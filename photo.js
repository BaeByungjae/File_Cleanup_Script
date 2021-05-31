const os = require("os");
const Fs = require("fs");
const Path = require("path");
const path = Path.join(os.homedir(), "Photos\\");

const folders = ["duplicated", "video", "captured"];
const files = [];

function fn(args) {
  const path_copy = path + args;
  Fs.promises
    .readdir(path_copy)
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
          Rename(item, "video", path_copy);
        } else if ([".png", ".aae"].includes(sept)) {
          Rename(item, "captured", path_copy);
        } else if (sept === ".jpg") {
          if (item.includes("E", 4)) {
            const str = item.replace("E", "");
            files.forEach((item) => {
              if (str === item) {
                Rename(item, "duplicated", path_copy);
                return false;
              }
            });
          }
        }
      });
    })
    .catch(console.error);
}

function Rename(item, folder, path_copy) {
  console.log(`move ${item} to ${folder}`);
  Fs.rename(
    path_copy + `\\` + item,
    path_copy + `\\${folder}\\` + item,
    (error) => {
      if (error) console.error(error);
    }
  );
}

fn(process.argv[2]);
