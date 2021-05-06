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
const folderpath = path.join(__dirname, "files")
console.log(folderpath)
function makeDir() {
    fs.mkdir(folderpath,(err) => {
        if (err) {
            throw err
        }
        console.log("folder has been created")
    })
}
//makeDir()
const filepath = path.join(__dirname, "files", "text.txt")
const createfile= function() {
    fs.writeFile(filepath, "hello node" , (err) => {
        if (err) {
            throw err
        }
        console.log("file has been created")
    })
    fs.appendFile(filepath, "\nhello again" , (err) => {
        if (err) {
            throw err
        }
        console.log("file has been created")
    })
}

const readFile = () => {
    fs.readFile(filepath,"utf-8", (err, content) => {
        if (err) {
            throw err
        }
        //const data = Buffer.from(content).toString()
        console.log(content);
        const encrypteddata= content.toLowerCase().split('')
        //console.log(encrypteddata);
        encrypteddata.forEach((elem) => {
            //console.log(elem)
            if (elem.charCodeAt(0)) {
                elem=String.fromCharCode(elem.charCodeAt(0)+1)
                console.log(elem)
            }
        })
        console.log(encrypteddata);
    })
}

createfile()
readFile()