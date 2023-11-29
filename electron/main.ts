import {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  dialog,
  Menu,
  MenuItem,
} from 'electron';
import path from 'node:path';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js

// DIST 환경 변수를 dist 디렉토리 경로로 설정합니다.
process.env.DIST = path.join(__dirname, '../dist');

// 앱이 패키지화되었는지 여부에 따라 VITE_PUBLIC 환경 변수를 설정합니다.
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

let initPosition: number[] | undefined;

function createWindow() {
  win = new BrowserWindow({
    title: 'my stream deck application',
    width: 350,
    height: 175,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // focusable: false, input 입력을 방해함
    fullscreenable: false,
    maximizable: false,
    resizable: process.env.NODE_ENV === 'development',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });
}

app.whenReady().then(() => {
  createWindow();

  // 처음 위치 정하기
  win?.once('ready-to-show', () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const initWidth = 350;
    const initHeight = 175;
    const x = width - initWidth - 50;
    const y = height - initHeight;

    initPosition = [x, y];
    win?.setPosition(x, y);
    win?.show();
  });

  // win?.webContents.openDevTools();

  // 창이 로드 완료되면 Renderer 프로세스로 테스트 메시지를 보냅니다.
  win?.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // 개발 서버 또는 빌드된 앱에 따라 적절한 URL을 로드합니다.
  if (VITE_DEV_SERVER_URL) {
    win?.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win?.loadFile(path.join(process.env.DIST, 'index.html'));
  }
});

//* Context Menu
const ctxMenu = new Menu();
ctxMenu.append(
  new MenuItem({
    label: 'Delete Stream button',
    click: () => {
      console.log('deleted this button');
      win?.webContents.send('delete-this-button');
    },
  }),
);
ctxMenu.append(
  new MenuItem({
    label: 'Delete All Stream button',
    click: () => {
      console.log('all deleted buttons');
      win?.webContents.send('delete-all-buttons');
    },
  }),
);

ipcMain.on('show-context-menu', () => {
  ctxMenu.popup();
});

//* 화면사이즈 조정

ipcMain.on('resize-xs', () => {
  win?.setSize(350, 175);
});

ipcMain.on('resize-small', () => {
  win?.setSize(400, 200);

  const currentPosition = win?.getPosition();
  if (currentPosition && initPosition) {
    const [currentX, currentY] = currentPosition;
    const [initX, initY] = initPosition;
    if (currentX === initX || currentY === initY) {
      const newX = currentX - 30;
      const newY = currentY - 30;

      win?.setPosition(newX, newY);
    }
  }
});

ipcMain.on('resize-medium', () => {
  win?.setSize(500, 250);

  const currentPosition = win?.getPosition();
  if (currentPosition && initPosition) {
    const [currentX, currentY] = currentPosition;
    const [initX, initY] = initPosition;
    if (currentX === initX - 50 || currentY === initY - 30) {
      const newX = currentX - 100;
      const newY = currentY - 30;

      win?.setPosition(newX, newY);
    } else if (currentX === initX || currentY === initY) {
      const newX = currentX - 150;
      const newY = currentY - 50;

      win?.setPosition(newX, newY);
    }
  }
});

//* Pin 조정
ipcMain.on('get-window-state', (e) => {
  const state = win?.isAlwaysOnTop();
  e.sender.send('window-state', state);
});
ipcMain.on('onTop', () => win?.setAlwaysOnTop(true));
ipcMain.on('noTop', () => win?.setAlwaysOnTop(false));

//* Dialog 통신
ipcMain.handle('show-open-dialog', async () => {
  return await dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory'],
  });
});

//* 종료
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// 모든 창이 닫힐 때 앱을 종료합니다. macOS에서는 제외됩니다.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

// 앱이 활성화되고 열린 창이 없는 경우 주 창을 다시 생성합니다 (macOS 전용).
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
