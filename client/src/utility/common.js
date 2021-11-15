import CryptoJS from "crypto-js";

export function encryptPassword(password) {
    return CryptoJS.AES.encrypt(JSON.stringify(password), 'kcGSJ548tq3bsLKFfwuefhfj9n').toString();
}

export function decryptPassword(ciphertext){
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'kcGSJ548tq3bsLKFfwuefhfj9n');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
}