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

export const utils = {
    getStorage,
    setStorage,
    getStorageThenSave,
    objectToArray,
}