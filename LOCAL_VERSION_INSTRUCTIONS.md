# Local Version / Installer Instructions

The project is already configured with **Electron** to run as a local desktop application (Windows, macOS, Linux).

## Folder Structure
The Electron configuration is located in the `electron/` folder:
- `electron/main.ts`: The main process entry point.
- `electron/preload.ts`: The bridge between Node.js and the UI.
- `electron/tsconfig.json`: TypeScript config for the Electron process.

## How to Run Locally (Dev Mode)
To test the "Local Version" immediately without building an installer:

```bash
npm run electron:dev
```

This will start the Vite server AND the Electron window simultaneously.

## How to Build the Installer
To generate the downloadable files (`.exe`, `.dmg`, `.AppImage`):

```bash
# Build for your current OS
npm run electron:build

# Build for all platforms (Windows, Mac, Linux) - check package.json "electron:build:all"
npm run electron:build:all
```

**Note**: Building for *all* platforms usually requires being on a Mac (to build `dmg`) or using specific CI/CD tools.

The output files (installers) will be generated in the `release/` folder.

## About "Microsoft Word Clones"
The workspace contains folders for `libreoffice` (C++ source) and `onlyoffice` (Server-based PHP/Node).
These are **not suitable** for a purely client-side "Frankenstein" integration without a backend server or Docker.

**Solution**: The project includes the **Syncfusion Document Editor**, which is a powerful client-side Word processor clone.
I have enabled it at the route: `/work/word-clone`.
It runs entirely in the browser (client-side) and satisfies the "no docker/hosting" requirement.
