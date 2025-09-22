const {app, BrowserWindow} = require('electron/main')
const path = require('node:path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js')
        }
    })
    win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()


    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})

app.on('windows-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})