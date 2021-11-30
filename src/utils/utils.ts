import Web3 from "web3";

function getStorage<T>(key: string, defaultValue: T): T {
    let value = localStorage.getItem(key)
    if (value === null) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
    } else {
        return JSON.parse(value)
    }
}
function setStorage(key: string, value: any) {
    let data: string = JSON.stringify(value);
    localStorage.setItem(key, data)
}
function getStorageThenSave<T>(key: string, defaultValue: T, callback: (data: T) => void) {
    const data = getStorage(key, defaultValue)
    callback(data)
    setStorage(key, data);
}

function objectToArray<T>(object: { [id: string]: T })
    : Array<T & { _id: string }> 
{
    const result = Object.keys(object).map(_id => {
        return {
            _id,
            ...object[_id],
        }
    })
    return result
}
async function getWeb3(): Promise<Web3> {
    return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            let _window: any = window;
            // Modern dapp browsers...
            if (_window.ethereum) {
                let ethereum: any = (window as any).ethereum
                const web3 = new Web3(ethereum)
                try {
                    await ethereum.request({ method: 'eth_requestAccounts' })
                    resolve(web3);
                } catch(error) {
                    reject(error)
                }
            }
            // Legacy dapp browsers...
            else if (_window.web3) {
                const web3: Web3 = _window.web3
                console.log("Injected web3 detected.");
                resolve(web3);
            }
            // Fallback to localhost; use dev console port by default...
            else {
                const provider = new Web3.providers.HttpProvider(
                    "http://127.0.0.1:7545"
                );
                const web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                resolve(web3);
            }
        })
    })
}

export const utils = {
    getWeb3,
    getStorage,
    setStorage,
    getStorageThenSave,
    objectToArray,
}