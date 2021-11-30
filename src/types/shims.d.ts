export {}
import EthCrypto from "eth-crypto";
declare global {
    interface Window {
        // clipboard: Clipboard
        __REDUX_DEVTOOLS_EXTENSION__: any
        // EthCrypto: typeof EthCrypto
    }
}