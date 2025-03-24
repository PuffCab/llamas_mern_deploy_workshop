import fs from "fs";

const deleteTempFile = (file) => {
  console.log("file :>> ", file);

  if (file) {
    fs.unlink(file.path, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  } else {
    console.log("I can only remove files");
  }
};

export default deleteTempFile;
