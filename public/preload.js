const { clipboard, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('clipboard', clipboard)