const { app, BrowserWindow, ipcMain } = require('electron');
const path                            = require('path');
var rate = 5600;
const fs                              = require("fs");

const apiUrl = "http://localhost:8000/"

function createWindow() {
    win = new BrowserWindow({
        width: 1800,
        height: 900,
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
        }
    });
    ipcMain.handle('SendData', SendData);
    ipcMain.handle('sendinventoryData', sendinventoryData);
    ipcMain.handle('sendGoldRate', sendGoldRate);
    ipcMain.handle('getCustDetails', getCustDetails);
    ipcMain.handle('getBills', getBills);

    win.loadFile('src/mainpage.html');  
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})




var postCall = async (endPoint, data) => {
    fetch(apiUrl + endPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
    })
    .catch((err) => {
        console.log(err);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
      });
}



var sendGoldRate = async (request, data) => {
    // console.log(rate);
    await postCall("rates", data);
}

var SendData = async (request, custData, data) => {
    // console.log(custData);
    // console.log(data);
    await postCall("bills", data);
    await postCall("customers", custData);
}

var sendinventoryData = async (request, data) => {
    // console.log(data);
    await postCall("inventory", data);
}

var getBills = async (request) => {
    fetch(apiUrl + "bills")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
    })
    .catch((err) => {
        console.log(err);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
    console.error('Fetch error:', error);
    });
}

var getCustDetails = async (request) => {
    fetch(apiUrl + "customers")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
    })
    .catch((err) => {
        console.log(err);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
    console.error('Fetch error:', error);
    });
}