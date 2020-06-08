const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron;



let mainWindow;
let commentWindow;
let commentMenu = null;



app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})


function createCommentWindow(){
  commentWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
  },
    width: 500,
    height: 300,
    title:'Novo comentário'
  })
  commentWindow.loadURL(`file://${__dirname}/comment.html`);
  commentWindow.on('closed', () => commentWindow = null)

  if(process.platform !== 'darwin'){
    commentWindow.setMenu(commentMenu)
  }

}


ipcMain.on('addComment', (event, comment) => {
  mainWindow.webContents.send('addComment', comment)
  debugger;
  commentWindow.close();
})




const menuTemplate = [
  {
    label: 'Menu',
    submenu:[
      {
        label:'Adicionar comentário',
        click(){
          createCommentWindow();
        }
      },
      {
        label: 'Sair fora',
        accelerator: process.plataform === 'win32' ? 'Alt+F4' : 'Cmd+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
]

if(process.platform === 'darwin'){
  menuTemplate.unshift({});
}

if(process.env.NODE_ENV  !== 'production'){
  // development
  // production
  // test .. etc
  const devTemplate = {
    label: 'Dev',
    submenu: [
      { role: 'reload'},
      {
        label:'Debug',
        accelerator: process.platform === 'win32' ? 'Ctrl+Shifit+I' : 'Cmd+Alt+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ] 
  };
  menuTemplate.push(devTemplate);
if(process.env.NODE_ENV  !== 'darwin'){
  commentMenu = Menu.buildFromTemplate([devTemplate])
}


}