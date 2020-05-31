import { UtilService } from './UtilService'
import { StorageService } from './StorageService'

var USER = { userName: 'Ramus', fullName: 'Rami Davidov', password: '123456', friends: [] };
const KEY = 'user';

async function getUser() {
    USER = await StorageService.load(KEY);
    return USER ? USER : null;
}
function signUp(newUser) {
    USER = {
        _id: UtilService.makeId(7),
        userName: newUser.userName,
        fullName: newUser.fullName,
        password: newUser.password,
        friends: [],
    };
    StorageService.save(KEY, USER);
    return USER;
}


export const UserService = {
    getUser,
    signUp,
}