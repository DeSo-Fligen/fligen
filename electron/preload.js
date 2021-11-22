const { clipboard, contextBridge } = require('electron')
const EthCrypto = require('eth-crypto');

contextBridge.exposeInMainWorld('clipboard', clipboard)

// ethereum crypto module
contextBridge.exposeInMainWorld('EthCrypto', EthCrypto)