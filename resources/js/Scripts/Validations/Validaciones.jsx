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
