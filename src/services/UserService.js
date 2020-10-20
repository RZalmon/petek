import { StorageService } from './StorageService'
import { HttpService } from './HttpService.js'
import avatarImg from '../assets/png/user.png'


const KEY = 'user';

async function getLoggedinUser() {
    var user = StorageService.load(KEY);
    if (!user) return null
    user = await HttpService.get(`user/${user._id}`)
    return user
}



async function getById(id) {
    const user = await HttpService.get(`user/${id}`)
    return user
}

async function signUp(credentials) {
    let { userName, fullName, password, imgUrl } = credentials
    let user = {
        userName,
        fullName,
        password,
        notifications: [],
        starredNotes: [],
        imgUrl: imgUrl ? imgUrl : avatarImg,
        joinedAt: Date.now(),
        friends: []
    };

    user = await HttpService.post('auth/signup', user)
    StorageService.save(KEY, user);
    // getUser()
    return user;
}

async function login(credentials) {
    const user = await HttpService.post('auth/login', credentials)
    if (!user) return null;
    StorageService.save(KEY, user);
    return user;
}


async function logout() {
    localStorage.removeItem(KEY)
    const msg = await HttpService.post('auth/logout');
    return (msg)
}

async function update(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    StorageService.save(KEY, updatedUser);
    return updatedUser
}

async function updateImgAtContacts(userId, imgUrl) {
    await HttpService.put(`user/${userId}/update`, { userId, imgUrl })
}

async function updateFriend(userId, friendId) {
    let friend = await getById(friendId)
    let userIdx = friend.friends.findIndex(user => user._id === userId)
    friend.friends.splice(userIdx, 1)
    await HttpService.put(`user/${friend._id}`, friend)
}


function getMinimalUser(_id, imgUrl) {
    return {
        _id,
        imgUrl
    }
}

function getRoomIdFromContact(loggedinUser, contact) {
    return loggedinUser.friends.find(friend =>  friend._id === contact._id )

}

export const UserService = {
    getById,
    signUp,
    update,
    login,
    logout,
    getMinimalUser,
    updateImgAtContacts,
    getLoggedinUser,
    getRoomIdFromContact,
    updateFriend,
}