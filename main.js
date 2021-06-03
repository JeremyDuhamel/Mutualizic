const update = require('update-electron-app')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        backgroundColor: '#181920',
        icon: __dirname + 'favico.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
        },
        autoHideMenuBar: true,
    })

    win.loadFile('./ui/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().lenght === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})