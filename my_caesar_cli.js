//@ts-check
const fs = require("fs");
const path = require("path");
//const encode = require("./encode");
const commander = require("commander"); // include commander in git clone of commander repo

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

  const encrypteddata = [];

  if (inputpath) {
    fs.readFile(inputpath, "utf-8", (err, content) => {
      if (err) {
        //throw err;
        process.stderr.write("файл не найден или нет доступа к нему");
        process.exit(3); //abort?
      }
      //console.log(content);
      //const encrypteddata = encode(content)
      const inputdata = content.split("");

      inputdata.forEach((elem) => {
        if (
          (elem.charCodeAt(0) &&
            elem.charCodeAt(0) >= 65 &&
            elem.charCodeAt(0) <= 90) ||
          (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122)
        ) {
          if (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122) {
            elem = String.fromCharCode(
              ((elem.charCodeAt(0) - 97 + shift) % 26) + 97
            );
          } else {
            if (elem.charCodeAt(0) >= 65 && elem.charCodeAt(0) <= 90) {
              elem = String.fromCharCode(
                ((elem.charCodeAt(0) - 65 + shift) % 26) + 65
              );
            }
          }
        }
        encrypteddata.push(elem);
        //console.log(encrypteddata);
      });
      //console.log(encrypteddata.join(""), "log1");
      //console.log(encrypteddata.join(""), "log");
      const encrypteddatatext = encrypteddata.join("");
      if (outputpath) {
        console.log(outputpath);
        fs.appendFile(outputpath, `${encrypteddatatext}\n`, (err) => {
          if (err) {
            //throw err;
            process.stderr.write("файл не найден или нет доступа к нему");
            process.exit(4); //abort?
          }
          //console.log("file has been encrypted");
        });
        return;
      }
      process.stdout.write(encrypteddatatext);
    });
  } else {
    process.stdin.on("readable", () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        //console.log(chunk);
        //process.stdout.write(`data: ${chunk}`);
        //const encrypteddata = encode(chunk.toString())
        const inputdata = chunk.toString().split("");

        inputdata.forEach((elem) => {
          if (
            (elem.charCodeAt(0) &&
              elem.charCodeAt(0) >= 65 &&
              elem.charCodeAt(0) <= 90) ||
            (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122)
          ) {
            if (elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122) {
              elem = String.fromCharCode(
                ((elem.charCodeAt(0) - 97 + shift) % 26) + 97
              );
            } else {
              if (elem.charCodeAt(0) >= 65 && elem.charCodeAt(0) <= 90) {
                elem = String.fromCharCode(
                  ((elem.charCodeAt(0) - 65 + shift) % 26) + 65
                );
              }
            }
          }
          encrypteddata.push(elem);
          //console.log(encrypteddata);
          //console.log(encrypteddata);
        });
        const encrypteddatatext = encrypteddata.join("");
        if (outputpath) {
          console.log(outputpath);
          fs.appendFile(outputpath, `\n${encrypteddatatext}`, (err) => {
            if (err) {
              throw err;
            }
            //console.log("file has been encrypted");
          });
          return;
        }
        process.stdout.write(encrypteddatatext);
      }
    });
  }
};

const program = new commander.Command();

program
  .option("-s, --shift <number>", "encryption/decryption shift", parseInt)
  .option("-i, --input [path]", "input file path")
  .option("-o, --output [path]", "output file path")
  .option("-a, --action [type]", "action type (encode or decode)")
  .parse(process.argv);

const options = program.opts();

let decode = false;
let shift = options.shift;
let outputpath1 = "";
let inputpath1 = "";

if (options.shift === undefined) {
  process.stderr.write("не указана опция смещения");
  process.exit(1); //abort?
} else if (options.shift === true) {
  process.stderr.write("не указан аргумент смещения");
  process.exit(2);
} else {
  //console.log(shift);
  if (isNaN(shift)) {
    process.stderr.write("не указан аргумент смещения");
    process.exit(2);
  }
  shift = parseInt(shift);
}

if (options.input === undefined) {
  process.stderr.write("не указана опция входного пути");
  process.exit(1); //abort?
} else if (options.input === true) {
  inputpath1 = "";
} else {
  inputpath1 = path.join(__dirname, options.input);
}

if (options.output === undefined) {
  process.stderr.write("не указана опция выходного пути");
  process.exit(2);
} else if (options.output === true) {
  outputpath1 = "";
} else {
  outputpath1 = path.join(__dirname, options.output);
}

if (options.action === undefined) {
  process.stderr.write("не указана опция шифрования");
  process.exit(2);
} else if (options.action === true) {
  process.stderr.write(
    "не указан аргумент шифрования, в качестве аргумента введите encode или decode"
  );
  process.exit(2);
} else if (options.action === "encode") {
  encryption(shift, inputpath1, outputpath1);
} else if (options.action === "decode") {
  decode = true;
  encryption(shift, inputpath1, outputpath1, decode);
} else {
  process.stderr.write("указанна неверная опция, введите encode или decode");
  process.exit(2);
}
