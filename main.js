require('dotenv').config();
const { app, Menu, Tray, shell } = require('electron');
const { menubar } = require('menubar');
const slackZoom = require('./slack-zoom');
const path = require('path');

const menuTemplate = [
  {
    label: 'About', click() {
      shell.openExternal('https://github.com/adamreidelbach/slack-zoom-electron')
    }
  },
  {
    label: 'Quit Slack-Zoom', click() {
      app.quit()
    }
  },
]

const iconPath = path.join(__dirname, 'assets', 'phone.png');

let tray = null;

app.on('ready', () => {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate(menuTemplate);
  tray.setToolTip('Slack-Zoom is running')
  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray
  });

  mb.on('ready', () => {
    slackZoom();
  });
});
