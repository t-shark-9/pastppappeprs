"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods to the renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // Offline storage methods
    offline: {
        save: (key, data) => electron_1.ipcRenderer.invoke('offline:save', key, JSON.stringify(data)),
        load: async (key) => {
            const result = await electron_1.ipcRenderer.invoke('offline:load', key);
            if (result.success && result.data) {
                try {
                    return { success: true, data: JSON.parse(result.data) };
                }
                catch {
                    return { success: true, data: result.data };
                }
            }
            return result;
        },
        delete: (key) => electron_1.ipcRenderer.invoke('offline:delete', key),
        list: () => electron_1.ipcRenderer.invoke('offline:list'),
    },
    // Network status
    network: {
        isOnline: () => electron_1.ipcRenderer.invoke('network:isOnline'),
    },
    // Platform info
    platform: {
        isElectron: true,
        os: process.platform,
    },
});
//# sourceMappingURL=preload.js.map