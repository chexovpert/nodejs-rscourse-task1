//@ts-check
const fs = require("fs");
const path = require("path");
const commander = require("commander");
const encryption = require("./mainfunction");

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
