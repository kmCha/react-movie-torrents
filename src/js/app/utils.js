import CryptoJS from 'crypto-js';

export function encryptPassword(str, salt) {
    var salt = salt || CryptoJS.lib.WordArray.random(256 / 8);
    var key256Bits = CryptoJS.PBKDF2(str, salt + '', {
        keySize: 256 / 32
    });
    return {
        salt: salt + '',
        hash: key256Bits + ''
    }
}

export function getQueryStr(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}