# File_Cleanup_Script

### 1. 운영체제별로 다른 home폴더에 photo폴더에 있는 subfolder에 미디어 파일들을 자동으로 정리해주는 파일이다.

### 2. 동영상 파일들은 video 파일로 옮겨준다.

### 3. 캡쳐된 파일들 aae파일이나 png 파일은 captured폴더로 옮겨준다.

### 4. 이제 원본이 수정된 파일은 수정이전 파일을 duplicated 파일로 옮겨준다.

## 5. logic
  ### 1) home 경로롤 os.homedir()을 통해 찾아준다.
    const path = Path.join(os.homedir(), "Photos\\");
  ### 2) 인자로 입력받는 서브폴더에 안에 있는 모든 폴더 및 파일을 검색하고, 폴더 존재하지 않을시 폴더를 생성한다
    const folders = ["duplicated", "video", "captured"];
    const path_copy = path + args; //args가 인자로 입력받는 서브폴더임
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
  ### 3) 이제 정리할 대상 파일에 따른 분기가 이루어진다.
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
