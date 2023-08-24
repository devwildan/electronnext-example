const path = require('path')

let extension
process.platform === 'win32' ?
    extension = 'ico' // .ico on Win32
    :
    extension = 'png' // .png on Darwin

module.exports = {
    png: path.join(__dirname, 'static', `logo.png`),
    ico: path.join(__dirname, 'static', 'logo.ico')
}