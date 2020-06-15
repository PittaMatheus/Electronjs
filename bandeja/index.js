const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const ChronoTray = require('./app/chronoTray');

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    nodeIntegration: true,
    width: 300,
    height: 150,
    frame: false,
    resizable: false,
    show: false,
    skipTaskbar: true
  });
  tray = new ChronoTray(`${__dirname}/robot.png`, mainWindow);
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('blur', () => {
    setTimeout(() => mainWindow.hide(), 200);
  });
});

ipcMain.on('timeUpdate', (event, timeUpdate) =>{
  if(process.platform == 'darwin'){
    tray.setTitle(timeUpdate)
  }else{
    tray.setToolTip(timeUpdate)
  }
})


