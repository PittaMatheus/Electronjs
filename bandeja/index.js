const electron = require('electron');
const { app, Tray, BrowserWindow, Menu } = electron;


let mainWindow;

app.on('ready', () => {
  const tray = new Tray(`${__dirname}/robot.png`);
  // tray.setToolTip("1951");
  tray.on('click', (event, bounds) => {
      // coordenadas do icone da bandeja
      // const { x, y } = bounds;
      // dimensoes da janela
      // const { width, height } = mainWindow.getBounds();
    if(mainWindow.isVisible()){
      mainWindow.hide();
    }else{
      // mainWindow.setBounds({
      //   x: x > 0 ? x - width / 2 : x,
      //   y:  y > 0 ? y - height / 2 : y,
      //   width, 
      //   height
      // });
      mainWindow.show();
    }
  });
  const contextMenu = Menu.buildFromTemplate(menuTemplate);
  tray.setContextMenu(contextMenu)

  mainWindow = new BrowserWindow({
    nodeIntegration: true,
    width: 300,
    height: 150,
    frame: false,
    resizable: false,
    show: false
    
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`)

});


const menuTemplate = [
  {
    label: 'abrir',
    click: () => {
      console.log('clicouu')
      mainWindow.show();

    }
  },
  {
    label: 'Configuração',
    click: () => {
      console.log('Configuração')
    }
  },
  {
    label: 'fechar',
    click: () => {
      console.log('Ajuda')
      mainWindow.close();
    }
  },

]