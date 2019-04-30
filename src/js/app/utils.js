import CryptoJS from 'crypto-js';

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
    encryptPassword
}