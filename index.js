const chalk = require('chalk')
const text = require('./data')
const fs = require('fs')
const path = require('path')

//console.log(chalk.blue(text))
//console.log(__dirname)
//console.log(path.dirname(__filename))
//console.log(__filename)
//console.log(path.basename(__filename))
//console.log(path.basename(__dirname))
// const folderpath = path.join(__dirname, "files")
// console.log(folderpath)
// function makeDir() {
//     fs.mkdir(folderpath,(err) => {
//         if (err) {
//             throw err
//         }
//         console.log("folder has been created")
//     })
// }
//makeDir()
const inputpath = path.join(__dirname, "files", "input.txt");
const outputpath = path.join(__dirname, "files", "output.txt");
const newpath = path.join(__dirname, "files", "newpath.txt");
const createfile= function() {
    fs.writeFile(inputpath, "hello node" , (err) => {
        if (err) {
            throw err
        }
        //console.log("file has been created")
    })
    fs.appendFile(inputpath, "\nhello again" , (err) => {
        if (err) {
            throw err
        }
        //console.log("file has been updated")
    })
}

const encryption = (shift) => {
    if (shift > 26) {
        shift = shift%26
    }
    fs.readFile(inputpath,"utf-8", (err, content) => {
        if (err) {
            throw err
        }
        console.log(content);
        const inputdata= content.toLowerCase().split('')
        const encrypteddata = []
        inputdata.forEach((elem) => {
            if (elem.charCodeAt(0) && (elem.charCodeAt(0)>=65 && elem.charCodeAt(0)<=90)|| (elem.charCodeAt(0)>=97 && elem.charCodeAt(0)<=122)) {
                elem=String.fromCharCode(elem.charCodeAt(0)+shift)
                encrypteddata.push(elem)
                return
                //console.log(elem)
            }
            encrypteddata.push(elem)
        })
        console.log(encrypteddata.join(""));
        const encrypteddatatext=encrypteddata.join("")
        fs.writeFile(outputpath, encrypteddatatext, (err) => {
            if(err) {
                throw err
            }
            console.log('file has been encrypted');
        })
    })
}
const decryption = (shift) => {
    if (shift > 26) {
        shift = shift%26
    }
    fs.readFile(outputpath,"utf-8", (err, content) => {
        if (err) {
            throw err
        }
        console.log(content);
        const inputdata= content.toLowerCase().split('')
        const encrypteddata = []
        inputdata.forEach((elem) => {
            if (elem.charCodeAt(0) && (elem.charCodeAt(0)>=65 && elem.charCodeAt(0)<=90)|| (elem.charCodeAt(0)>=97 && elem.charCodeAt(0)<=122)) {
                elem=String.fromCharCode(elem.charCodeAt(0)-shift)
                encrypteddata.push(elem)
                return
                //console.log(elem)
            }
            encrypteddata.push(elem)
        })
        console.log(encrypteddata.join(""));
        const encrypteddatatext=encrypteddata.join("")
        fs.writeFile(newpath, encrypteddatatext, (err) => {
            if(err) {
                throw err
            }
            console.log('file has been decrypted');
        })
    })
}

//createfile()
//encryption(53)
decryption(53)