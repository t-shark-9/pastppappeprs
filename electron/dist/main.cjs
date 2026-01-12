"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// Only run on Windows with Squirrel installer
if (process.platform === 'win32') {
    try {
        if (require('electron-squirrel-startup')) {
            electron_1.app.quit();
        }
    }
    catch (e) {
        // electron-squirrel-startup not available, ignore
    }
}
// Keep a global reference of the window object
let mainWindow = null;
// Determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || !electron_1.app.isPackaged;
// Path to user data for offline storage
const userDataPath = electron_1.app.getPath('userData');
const offlineCachePath = path.join(userDataPath, 'offline-cache');
// Ensure offline cache directory exists
if (!fs.existsSync(offlineCachePath)) {
    fs.mkdirSync(offlineCachePath, { recursive: true });
}
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
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
    }
    else {
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
function setupOfflineSupport() {
    const ses = electron_1.session.defaultSession;
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
electron_1.ipcMain.handle('offline:save', async (_, key, data) => {
    try {
        const filePath = path.join(offlineCachePath, `${key}.json`);
        fs.writeFileSync(filePath, data, 'utf-8');
        return { success: true };
    }
    catch (error) {
        console.error('Error saving offline data:', error);
        return { success: false, error: String(error) };
    }
});
electron_1.ipcMain.handle('offline:load', async (_, key) => {
    try {
        const filePath = path.join(offlineCachePath, `${key}.json`);
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return { success: true, data };
        }
        return { success: true, data: null };
    }
    catch (error) {
        console.error('Error loading offline data:', error);
        return { success: false, error: String(error) };
    }
});
electron_1.ipcMain.handle('offline:delete', async (_, key) => {
    try {
        const filePath = path.join(offlineCachePath, `${key}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting offline data:', error);
        return { success: false, error: String(error) };
    }
});
electron_1.ipcMain.handle('offline:list', async () => {
    try {
        const files = fs.readdirSync(offlineCachePath)
            .filter(f => f.endsWith('.json'))
            .map(f => f.replace('.json', ''));
        return { success: true, keys: files };
    }
    catch (error) {
        console.error('Error listing offline data:', error);
        return { success: false, error: String(error) };
    }
});
// Check if online
electron_1.ipcMain.handle('network:isOnline', async () => {
    return require('electron').net.isOnline();
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron_1.app.whenReady().then(() => {
    setupOfflineSupport();
    createWindow();
    electron_1.app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Quit when all windows are closed, except on macOS.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Handle app updates check (can integrate with electron-updater later)
electron_1.app.on('ready', () => {
    // Auto-updater can be configured here
    console.log('TooEssay Desktop App is ready');
});
//# sourceMappingURL=main.js.map