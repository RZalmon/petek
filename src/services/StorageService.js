function save(key, value) {
    console.log('$$$SAVE INVOKED$$$$', value);
    let item = JSON.stringify(value);
    localStorage.setItem(key, item);
}
function load(key) {
    console.log('$$$LOAD INVOKED$$$$');
    let item = localStorage.getItem(key)
    let value = JSON.parse(item);
    return value;
}


export const StorageService = {
    save,
    load
}