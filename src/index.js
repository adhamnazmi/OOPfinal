const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
var mainWindow;

var addWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  var mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.webContents.openDevTools();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window in the app when the dock icon is clicked
  // and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

var mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add new item',
        click() {
          addWindow = new BrowserWindow({
            width: 400,
            height: 300,
            title: 'Add new Item',
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });
          // and load the add.html file.
          addWindow.loadFile(path.join(__dirname, 'add.html'));
        },
      },
      {
        label: 'Clear all items',
      },
      {
        label: 'Quit/Exit',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About us',
      },
    ],
  },
];
