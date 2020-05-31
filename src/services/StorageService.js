function save(key, value) {
    let item = JSON.stringify(value);
    localStorage.setItem(key, item);
}
function load(key) {
    let item = localStorage.getItem(key)
    let value = JSON.parse(item);
    return value;
}
export const StorageService = {
    save,
    load
}