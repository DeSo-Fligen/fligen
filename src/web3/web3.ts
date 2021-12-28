import Web3 from "web3";

/**
 * // FIXME 可能是升级了react-script导致的引入报错，所以暂时不引入
 * @returns {Web3} web3 实例
 */
export const getWeb3 = async (): Promise<Web3> => {
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
            // else {
            //     const provider = new Web3.providers.HttpProvider(
            //         "http://127.0.0.1:7545"
            //     );
            //     const web3 = new Web3(provider);
            //     console.log("No web3 instance injected, using Local web3.");
            //     resolve(web3);
            // }
        })
    })
}