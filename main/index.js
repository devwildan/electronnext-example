// // Native
// const { join } = require('path')
// const { format } = require('url')

// // Packages
// const { BrowserWindow, app, ipcMain ,Tray} = require('electron')
// const isDev = require('electron-is-dev')
// const prepareNext = require('electron-next')

// // Prepare the renderer once the app is ready
// app.on('ready', async () => {
//   await prepareNext('./renderer')

//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: false,
//       preload: join(__dirname, 'preload.js'),
//     },
//   })

//   const url = isDev
//     ? 'http://localhost:8000'
//     : format({
//         pathname: join(__dirname, '../renderer/out/index.html'),
//         protocol: 'file:',
//         slashes: true,
//       })

//   mainWindow.loadURL(url)
// })

// // Quit the app once all windows are closed
// app.on('window-all-closed', app.quit)

// // listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('message', (event, message) => {
//   event.sender.send('message', message)
// })
"use strict";

// Native
const {
  join
} = require("path");
const {
  platform
} = require("os");
const url = require("url");
const icons = require('./icons')
// Packages
const {
  BrowserWindow,
  app,
  Menu,
  Tray,
  globalShortcut
} = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const {
  resolve
} = require("app-root-path");
const Positioner = require("electron-positioner");
const AutoLaunch = require("auto-launch");
const log = require("electron-log");

// Utils
// const { getConfig } = require("./utils/config");
const autoUpdater = require("./updater");

let tray;
let trayWindow;
let positioner;
const autoLauncher = new AutoLaunch({
  name: "Snip"
});

app.setAppUserModelId("com.ccode.snip");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");
  autoLauncher.enable();
  // app.config = await getConfig();
  createTray();
  createWindow();
  checkForUpdates();
  registerGlobalShortcuts();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
if (app.dock) app.dock.hide();
// Create Tray
function createTray() {
  tray = new Tray(icons.png); //import icon
  //   tray = new Tray( join(__dirname, "main/static/logo.ico")); //import icon
  tray.setToolTip("Snip, click to open");
  tray.on("click", () => toggleWindow());
}

function toggleWindow() {
  if (trayWindow.isVisible()) {
    trayWindow.hide();
    if (process.platform === "darwin") {
      app.dock.hide();
      trayWindow.setSkipTaskbar(true);
    }
  } else {
    trayWindow.show();
    if (process.platform === "darwin") {
      app.dock.show();
      trayWindow.setSkipTaskbar(true);
    }
  }
}

function createWindow() {
  trayWindow = new BrowserWindow({
    width: 400,
    height: 550,
    resizable: false,
    movable: false,
    fullscreenable: false,
    alwaysOnTop: true,
    icon: icons.png,
    show: false,
    skipTaskbar: true,
    frame: false,//platform() !== "win32",
    titleBarStyle: "hidden",
    icon: platform() === "win32" ?
      join(__dirname, "main/static/logo.ico") : join(__dirname, "main/static/logo.icns"),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, 'preload.js'),
    },
  });
  const devPath = "http://localhost:8000/";
  if (isDev) { 
    trayWindow.loadURL(devPath);
    trayWindow.webContents.openDevTools();
  } else {
    // PRODUCTION Load the React build
    trayWindow.loadURL(
      url.format({
        pathname: resolve("renderer/out/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }
  positioner = new Positioner(trayWindow);
  let trayPosition;
  if (process.platform === "win32") {
    trayPosition = "trayBottomCenter";
  } else if (process.platform === "darwin") {
    trayPosition = "trayCenter";
  } else {
    trayPosition = "trayRight";
  }
  positioner.move(trayPosition, tray.getBounds());
  trayWindow.setSkipTaskbar(true)
  trayWindow.on("ready-to-show", () => {
    trayWindow.show();
    if (app.dock) app.dock.hide();
    if (trayWindow.setSkipTaskbar) {
      trayWindow.setSkipTaskbar(true)
    }
  });

  const template = [{
    label: "Application",
    submenu: [{
      label: "About Application",
      selector: "orderFrontStandardAboutPanel:"
    },
    {
      type: "separator"
    },
    {
      label: "Quit",
      accelerator: "Command+Q",
      click: () => app.quit()
    }
    ]
  },
  {
    label: "Edit",
    submenu: [{
      label: "Undo",
      accelerator: "CmdOrCtrl+Z",
      selector: "undo:"
    },
    {
      label: "Redo",
      accelerator: "Shift+CmdOrCtrl+Z",
      selector: "redo:"
    },
    {
      type: "separator"
    },
    {
      label: "Cut",
      accelerator: "CmdOrCtrl+X",
      selector: "cut:"
    },
    {
      label: "Copy",
      accelerator: "CmdOrCtrl+C",
      selector: "copy:"
    },
    {
      label: "Paste",
      accelerator: "CmdOrCtrl+V",
      selector: "paste:"
    },
    {
      label: "Select All",
      accelerator: "CmdOrCtrl+A",
      selector: "selectAll:"
    }
    ]
  },
  {
    label: "View",
    submenu: [{
      label: "Developer Tools",
      accelerator: "CmdOrCtrl+alt+I",
      click: (item, focusedWindow) => {
        const webContents = focusedWindow.webContents;

        if (webContents.isDevToolsOpened()) {
          webContents.closeDevTools();
        } else {
          webContents.openDevTools({
            mode: "detach"
          });
        }
      }
    }]
  }
  ];

  if (platform() !== "win32") {
    autoUpdater();
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function checkForUpdates() {
  // let currentVer;
  // let latestVer;

  // if (process.platform === "darwin") {
  //   const notifyLatestVersion = require("./utils/notifyLatestVersion");
  //   const {
  //     currentVersion,
  //     latestVersion
  //   } = await notifyLatestVersion();
  //   currentVer = currentVersion;
  //   latestVer = latestVersion;
  // } else {
  //   const {
  //     autoUpdater
  //   } = require("electron-updater");
  //   const getLatestVersion = require("./utils/getLatestVersion");
  //   const {
  //     currentVersion,
  //     latestVersion
  //   } = await getLatestVersion();
  //   currentVer = currentVersion;
  //   latestVer = latestVersion;
  //   autoUpdater.checkForUpdatesAndNotify();
  // }
}

function registerGlobalShortcuts() {
  // Global Shortcut : Toggle Window
  const shortcutToggleWindow = globalShortcut.register("Super+Alt+Up", () => {
    toggleWindow();
  });
  const shortcutToggleState = globalShortcut.register("Super+Alt+Down", () => {
    toggleWindow();
  });
  if (!shortcutToggleState) {
    log.warn("Unable to register:CommandOrControl+Down");
  }
}