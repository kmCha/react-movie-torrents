import CryptoJS from 'crypto-js';

const networkErrorMsg = '网络错误，请稍后再试！';

function encryptPassword(str, salt) {
    var salt = salt || CryptoJS.lib.WordArray.random(256 / 8);
    var key256Bits = CryptoJS.PBKDF2(str, salt + '', {
        keySize: 256 / 32
    });
    return {
        salt: salt + '',
        hash: key256Bits + ''
    }
}

export {
    networkErrorMsg,
    encryptPassword
}