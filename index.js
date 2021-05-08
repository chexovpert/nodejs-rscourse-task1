//@ts-check
const fs = require("fs");
const path = require("path");
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
        throw err;
      }
      //console.log(content);
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
            throw err;
          }
          console.log("file has been encrypted");
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
            console.log("file has been encrypted");
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
  .option("-i, --input <path>", "input file path")
  .option("-o, --output <path>", "output file path")
  .option("-a, --action <type>", "action type (encode or decode)")
  .parse(process.argv);

const options = program.opts();

const shift = options.shift !== undefined ? options.shift : "nosauce";

let outputpath1 = "";
let inputpath1 = "";

if (options.input !== undefined) {
  inputpath1 = path.join(__dirname, options.input);
}
if (options.output !== undefined) {
  outputpath1 = path.join(__dirname, options.output);
}
if (options.action === "encode") {
  encryption(shift, inputpath1, outputpath1);
}
if (options.action === "decode") {
  const decription = true;
  encryption(shift, inputpath1, outputpath1, decription);
}
