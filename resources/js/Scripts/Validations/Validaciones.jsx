export const validateMaxLength = (word, maxLength, message) => {
    if (typeof word === 'string' && word.trim().length > maxLength) {
        alert(message);
        return false;
    }
    return true;
};

export const validateMinLength = (word, minLength, message) => {
    if (typeof word === 'string' && word.trim().length < minLength) {
        alert(message);
        return false;
    }
    return true;
};

export const validateNotEmpty = (word, message) => {
    if (word === null || word === undefined || word.toString().trim().length === 0) {
        alert(message);
        return false;
    }
    return true;
};

export const validatePriceFormat = (price, message) => {
    const priceRegex = /^\d+(\.\d{1,6})?$/;
    if (!priceRegex.test(price)) {
        alert(message);
        return false;
    }
    return true;
};

export const validatePriceValue = (price, message) => {
    if (parseFloat(price) < 0) {
        alert(message);
        return false;
    }
    return true;
};

export const validatePhoneNumber = (phone, message) => {
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateDNI = (dni, message) => {
    const dniRegex = /^[0-9]{8}$/;
    if (!dniRegex.test(dni)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateDocumentoColombia = (dni, message) => {
    const dniRegex = /^[0-9]{6,12}$/; 
    if (!dniRegex.test(dni)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateEmailFormat = (email, message) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateDateFormat = (date, message) => {
    if (isNaN(Date.parse(date))) {
        alert(message);
        return false;
    }
    return true;
};

export const validateSalary = (salary, message) => {
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    if (!salaryRegex.test(salary) || parseFloat(salary) <= 0) {
        alert(message);
        return false;
    }
    return true;
};

export const validateBoolean = (value, message) => {
    if (typeof value !== 'boolean') {
        alert(message);
        return false;
    }
    return true;
};

export const validatePasswords = (password1, password2, message) => {
    if (password1 !== password2) {
        alert(message);
        return false;
    }
    return true;
};

export const validateFileSize = (file, maxSize, message) => {
    if (file && file.size > maxSize) {
        alert(message);
        return false;
    }
    return true;
};

export const validateFileType = (file, allowedTypes, message) => {
    if (file && !allowedTypes.includes(file.type)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateIP = (ip, message) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ip)) {
        alert(message);
        return false;
    }
    return true;
};

export const validateMAC = (mac, message) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(mac)) {
        alert(message);
        return false;
    }
    return true;
};