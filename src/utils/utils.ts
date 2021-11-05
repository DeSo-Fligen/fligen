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

export const utils = {
    getStorage,
    setStorage,
}