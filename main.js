// Show electron page with electron version displayed
// and a button to open a new window
 
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

// Global reference to the main window
let mainWindow;

// Create the main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Allow node integration in the main window
      nodeIntegration: true,
      // Allow remote module in the main window
      enableRemoteModule: true
    },
    icon: "public/images/trs.ico"
  })

  // Load the index.html of the app
  mainWindow.loadFile('public/index.html')

  // Hide the menu bar
  mainWindow.setMenuBarVisibility(false)

  // Emitted when the main window is closed
  mainWindow.on('closed', function () {
    // Dereference the main window object
    mainWindow = null
  })
}

// Create both windows when electron is ready
app.whenReady().then(() => {
  createMainWindow()
})

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

