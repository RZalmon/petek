// import { UtilService } from './UtilService'
import { StorageService } from './StorageService'
import { HttpService } from './HttpService.js'

// var USER = { userName: 'Ramus', fullName: 'Rami Davidov', password: '123456', friends: [] };
const KEY = 'user';

function getUser() {
    const USER = StorageService.load(KEY);
    return USER ? USER : null;
}
async function signUp(credentials) {
    let USER = {
        userName: credentials.userName,
        fullName: credentials.fullName,
        password: credentials.password,
        friends: [],
        notifications: [],
        imgUrl: credentials.imgUrl
    };
    USER = await HttpService.post('auth/signup', USER)
    console.log('Frontend USER SERVICE USER, ', USER);
    StorageService.save(KEY, USER);
    // getUser()
    return USER;
}

async function login(credentials) {
    const USER = await HttpService.post('auth/login', credentials)
    if (!USER) return
    StorageService.save(KEY, USER);
    return USER;
}


async function logout() {
    const msg = await HttpService.post('auth/logout');
    localStorage.removeItem(KEY)
    return (msg)
}

async function update(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    console.log('user service update USER AFTER BACKEND', updatedUser);
    StorageService.save(KEY, updatedUser);
    return updatedUser
}

export const UserService = {
    getUser,
    signUp,
    update,
    login,
    logout
}