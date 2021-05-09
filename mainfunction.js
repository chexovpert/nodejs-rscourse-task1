//@ts-check
const fs = require("fs");
const encode = require("./encode");
const { pipeline } = require("stream");
const { inputStream, outputStream, EncodeChunk } = require("./streams");

const encryption = (shift, inputpath, outputpath, decription = false) => {
  if (decription) {
    shift = -shift;
  }
  if (shift >= 26) {
    shift = shift % 26;
  }
  if (shift < 0) {
    shift = 26 - Math.abs(shift % 26);
  }

  //let encrypteddata = "";

  const transformStream = new EncodeChunk(encode, shift);

  if (inputpath) {
    const iStr = inputStream(inputpath);
    if (outputpath) {
      const wStr = outputStream(outputpath);
      pipeline(iStr, transformStream, wStr, (err) => {
        if (err) {
          process.stderr.write("файл не найден или нет доступа к нему");
          process.exit(4); //abort?
        }
      });
      return;
    }
    //console.log("smth");
    pipeline(iStr, transformStream, process.stdout, (err) => {
      if (err) {
        process.stderr.write("файл не найден или нет доступа к нему");
        process.exit(4); //abort?
      }
    });
    return;
  } else {
    const iStr = process.stdin;
    if (outputpath) {
      const wStr = outputStream(outputpath);
      pipeline(iStr, transformStream, wStr, (err) => {
        if (err) {
          process.stderr.write("файл не найден или нет доступа к нему");
          process.exit(4); //abort?
        }
      });
      return;
    }
    //console.log("smth");
    pipeline(iStr, transformStream, process.stdout, (err) => {
      if (err) {
        process.stderr.write("файл не найден или нет доступа к нему");
        process.exit(4); //abort?
      }
    });
    return;
  }
};

module.exports = encryption;
