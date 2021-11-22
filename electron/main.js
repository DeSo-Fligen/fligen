const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') })

const { app, BrowserWindow, session } = require('electron');
const os = require('os')
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

/**
 * load chrome extensions
 * if OS platform is not MacOS, please add your path
 */
async function loadExtensions() {
  if (!isDev) { return }
  const loadChromeExtension = async (name, id, version) => {
    if (version) {
      console.log(`> load chrome extension: ${name} versions: ${version}`)
      const extensionPath = path.join(os.homedir(), `/Library/Application Support/Google/Chrome/Default/Extensions/${id}/${version}`)
      await session.defaultSession.loadExtension(extensionPath)
    } else {
      console.warn(`> load chrome extension: ${name} no version specified！`)
    }
  }
  await loadChromeExtension(`React Dev Tool`, 'fmkadmapgofadopljbjfkapdkoienihi', process.env.REACT_DEV_TOOL_VERSION);
  await loadChromeExtension(`Redux Dev Tool`, 'lmhkpmbekcpmknklioeibfkpmmfibljd', process.env.REDUX_DEV_TOOL_VERSION);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
  .then(createWindow)
  .then(loadExtensions);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});