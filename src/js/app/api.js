import axios from 'axios'

var apiHost = '//api.chamajiuxi.com'

if (__DEBUG) {
    apiHost = 'http://localhost:3000'
}

var instance = axios.create({
    baseURL: apiHost,
    withCredentials: true
})

export {
    apiHost
}

// 获取用户盐
export async function getUserSalt({
    userName
}) {
    return await instance.get('/salt', {
        params: {
            userName
        }
    })
}

// 登录
export async function userLogin({
    userName,
    hash,
    remember
}) {
    return await instance.post('/login', {
        userName,
        hash,
        remember
    })
}

// 注册
export async function userSignUp({
    userName,
    salt,
    hash
}) {
    return await instance.post('/signup', {
        userName,
        salt,
        hash
    })
}

// 登出
export async function userLogOut() {
    return await instance.get('/logout')
}

// 获取用户信息
export async function getUserInfo() {
    return await instance.get('/info')
}

// 获取电影种子列表
export async function getTorrents({
    id
}) {
    return await instance.get('/torrents', {
        params: {
            id
        }
    })
}

// 获取电影列表
export async function getMovieList({
    page,
    tag,
    search
}) {
    return await instance.get('/movies', {
        params: {
            page,
            tag,
            search
        }
    })
}

// 获取电影数量
export async function getTotalCount({
    tag,
    search
}) {
    return await instance.get('/totalcount', {
        params: {
            tag,
            search
        }
    })
}

// 获取标签列表
export async function getTagList() {
    return await instance.get('/taglist')
}