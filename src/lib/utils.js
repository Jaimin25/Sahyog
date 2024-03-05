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
  baseapiurl = 'https://sahyog-backend.vercel.app';
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

const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const deCapitalizeString = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + ' year' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' month' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' day' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hour' + (interval === 1 ? '' : 's') + ' ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minute' + (interval === 1 ? '' : 's') + ' ago';
  }
  return 'just now';
}

export {
  baseapiurl,
  capitalizeString,
  checkForImage,
  checkYoutubeUrl,
  deCapitalizeString,
  decryptValue,
  encryptValue,
  getYtVideoId,
  timeSince,
};
