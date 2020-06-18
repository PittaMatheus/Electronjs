const electron = require('electron');
const { Tray, app, Menu } = electron;




class ChronoTray extends Tray {
  constructor(iconPatch, mainWindow) {
    super(iconPatch);  // Tray constructor
    this.mainWindow = mainWindow
    this.on('click', this.onClick.bind(this));
    this.setToolTip("1951");
    this.setContextMenu(this.context(mainWindow));
  }

  onClick(event, bounds) {
    // coordenadas do icone da bandeja
    // const { x, y } = bounds;
    // dimensoes da janela
    // const { width, height } = this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      // this.mainWindow.setBounds({
      //   x: x > 0 ? x - width / 2 : x,
      //   y:  y > 0 ? y - height / 2 : y,
      //   width, 
      //   height
      // });
      this.mainWindow.show();
    }
  }


context(mainWindow){
  return Menu.buildFromTemplate([
    {
      label: 'abrir',
      click: () => {
        mainWindow.show();

      }
    },
    {
      label: 'sair',
      click: () => {
        app.quit();
      }
    },
  ])
}

}

module.exports = ChronoTray;