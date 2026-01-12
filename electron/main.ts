import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// Only run on Windows with Squirrel installer
if (process.platform === 'win32') {
  try {
    if (require('electron-squirrel-startup')) {
      app.quit();
    }
  } catch (e) {
    // electron-squirrel-startup not available, ignore
  }
}

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

// Determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// Path to user data for offline storage
const userDataPath = app.getPath('userData');
const offlineCachePath = path.join(userDataPath, 'offline-cache');

// Ensure offline cache directory exists
if (!fs.existsSync(offlineCachePath)) {
  fs.mkdirSync(offlineCachePath, { recursive: true });
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    icon: path.join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'default',
    show: false, // Don't show until ready
  });

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Load the app
  if (isDev) {
    // In development, load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open external links in the default browser
    if (url.startsWith('http://') || url.startsWith('https://')) {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Configure session for offline support
function setupOfflineSupport(): void {
  const ses = session.defaultSession;

  // Enable cache for offline support
  ses.webRequest.onBeforeRequest((details, callback) => {
    callback({ cancel: false });
  });

  // Set up permission handling for offline support
  ses.setPermissionRequestHandler((webContents, permission, callback) => {
    // Allow all permissions for the app
    callback(true);
  });
}

// IPC handlers for offline data storage
ipcMain.handle('offline:save', async (_, key: string, data: string) => {
  try {
    const filePath = path.join(offlineCachePath, `${key}.json`);
    fs.writeFileSync(filePath, data, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error saving offline data:', error);
    return { success: false, error: String(error) };
  }
});

ipcMain.handle('offline:load', async (_, key: string) => {
  try {
    const filePath = path.join(offlineCachePath, `${key}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return { success: true, data };
    }
    return { success: true, data: null };
  } catch (error) {
    console.error('Error loading offline data:', error);
    return { success: false, error: String(error) };
  }
});

ipcMain.handle('offline:delete', async (_, key: string) => {
  try {
    const filePath = path.join(offlineCachePath, `${key}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting offline data:', error);
    return { success: false, error: String(error) };
  }
});

ipcMain.handle('offline:list', async () => {
  try {
    const files = fs.readdirSync(offlineCachePath)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
    return { success: true, keys: files };
  } catch (error) {
    console.error('Error listing offline data:', error);
    return { success: false, error: String(error) };
  }
});

// Check if online
ipcMain.handle('network:isOnline', async () => {
  return require('electron').net.isOnline();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  setupOfflineSupport();
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app updates check (can integrate with electron-updater later)
app.on('ready', () => {
  // Auto-updater can be configured here
  console.log('TooEssay Desktop App is ready');
});
