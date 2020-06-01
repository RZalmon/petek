// import { UtilService } from './UtilService'
import { StorageService } from './StorageService'
import { HttpService } from './HttpService.js'

var USER = { userName: 'Ramus', fullName: 'Rami Davidov', password: '123456', friends: [] };
const KEY = 'user';

function getUser() {
    USER = StorageService.load(KEY);
    return USER ? USER : null;
}
async function signUp(credentials) {
    USER = {
        userName: credentials.userName,
        fullName: credentials.fullName,
        password: credentials.password,
        friends: [],
    };
    StorageService.save(KEY, USER);
    await HttpService.post('auth/signup', USER)
    // getUser()
    return USER;
}

async function login(credentials) {
    const USER = await HttpService.post('auth/login', credentials)
    StorageService.save(KEY, USER);
    return USER;
}


async function logout() {
    const msg = await HttpService.post('auth/logout');
    localStorage.removeItem(KEY)
    return (msg)
}

export const UserService = {
    getUser,
    signUp,
    login,
    logout
}