const fs = require("fs");
const { Transform } = require("stream");

function inputStream(inputpath) {
  const rStream = fs.createReadStream(inputpath);
  rStream.on("error", (err) => {
    //console.log(err);
    process.stderr.write("файл не найден или нет доступа к нему");
    process.exit(4); //abort?
  });
  return rStream;
}
function outputStream(outputpath) {
  const wStream = fs.createWriteStream(outputpath);
  wStream.on("error", (err) => {
    //console.log(err);
    process.stderr.write("файл не найден или нет доступа к нему");
    process.exit(4); //abort?
  });
  return wStream;
}

class EncodeChunk extends Transform {
  constructor(encodefunction, shift) {
    super();
    this.encode = encodefunction;
    this.shift = shift;
  }
  _transform(chunk, encoding, callback) {
    const transformChunk = this.encode(chunk.toString(), this.shift);
    this.push(transformChunk);
    callback();
  }
  //   _flush(callback) {
  //     this.push(null);
  //   }
}

//const transformStream = new EncodeChunk(encode, shift);

module.exports = { inputStream, outputStream, EncodeChunk };
