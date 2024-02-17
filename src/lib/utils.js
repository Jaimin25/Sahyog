import CryptoJS from 'crypto-js';

function encryptValue(val) {
    return CryptoJS.AES.encrypt(
        val,
        import.meta.env.VITE_CRYPTOJS_SECRET_KEY
    ).toString();
}

function decryptValue(val) {
    return CryptoJS.AES.decrypt(
        val,
        import.meta.env.VITE_CRYPTOJS_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
}

let baseapiurl = '';

if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development'
) {
    baseapiurl = 'http://localhost:5172';
} else {
    baseapiurl = 'https://sahyog-backend.onrender.com';
}

const getYtVideoId = (url) => {
    const p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
    }
};

const checkYoutubeUrl = (url) => {
    const p =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return true;
    }
    return false;
};

const checkForImage = (url) => {
    const regex = /^https?:\/\/.*\/.*\.(png|jpeg|jpg)\??.*$/gim;

    if (url.match(regex)) {
        return true;
    } else {
        return false;
    }
};

export {
    baseapiurl,
    checkForImage,
    checkYoutubeUrl,
    decryptValue,
    encryptValue,
    getYtVideoId,
};
