const log = require('electron-log');
const { app, autoUpdater, dialog, BrowserWindow } = require('electron')
const path = require('path')
const server = 'https://mutualizic.herokuapp.com/'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

/*UPDATER*/
autoUpdater.setFeedURL({ url })
setInterval(() => {
    autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: "A new version has been downloaded. Restart the application to apply the updates."
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})
autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
})

/*INITIALIZE APPLICATION*/
function createWindow () {
    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        backgroundColor: '#181920',
        icon: __dirname + 'favicon.png',
        resizable: true,
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