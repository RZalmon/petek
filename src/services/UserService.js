import { UtilService } from './UtilService'
import { StorageService } from './StorageService'
import {HttpService} from './HttpService.js'


var USER = { userName: 'Ramus', fullName: 'Rami Davidov', password: '123456', friends: [] };
const KEY = 'user';

async function getUser() {
    USER = await StorageService.load(KEY);
    return USER ? USER : null;
}
async function signUp(newUser) {
    USER = {
        userName: newUser.userName,
        fullName: newUser.fullName,
        password: newUser.password,
        friends: [],
    };
    StorageService.save(KEY, USER);
    await HttpService.post('auth/signup',USER)
    return USER;
}


export const UserService = {
    getUser,
    signUp,
}