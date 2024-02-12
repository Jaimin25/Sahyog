import CryptoJS from 'crypto-js';

function encryptValue(val) {
    return CryptoJS.AES.encrypt(val, import.meta.env.VITE_CRYPTOJS_SECRET_KEY).toString();
}

function decryptValue(val) {
    return CryptoJS.AES.decrypt(val, import.meta.env.VITE_CRYPTOJS_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

let baseapiurl = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseapiurl = 'http://localhost:5172';
} else {
    baseapiurl = '';
}

export { baseapiurl, decryptValue, encryptValue };
