const validateMaxLength = (word, maxLength, message) => {
    if (typeof word === 'string' && word.trim().length > maxLength) {
        //alert(message);
        <ModalAlerta mensaje={message}/>
        return false;
    }
    return true;
};

const validateMinLength = (word, minLength, message) => {
    if (typeof word === 'string' && word.trim().length < minLength) {
        alert(message);
        return false;
    }
    return true;
};

const validateNotEmpty = (word, message) => {
    if (word === null || word === undefined || word.toString().trim().length === 0) {
        alert(message);
        return false;
    }
    return true;
};

const validatePriceFormat = (price, message) => {
    const priceRegex = /^\d+(\.\d{1,6})?$/;
    if (!priceRegex.test(price)) {
        alert(message);
        return false;
    }
    return true;
};

const validatePriceValue = (price, message) => {
    if (parseFloat(price) < 0) {
        alert(message);
        return false;
    }
    return true;
};

const validatePhoneNumber = (phone, message) => {
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert(message);
        return false;
    }
    return true;
};

const validateDNI = (dni, message) => {
    const dniRegex = /^[0-9]{8}$/;
    if (!dniRegex.test(dni)) {
        alert(message);
        return false;
    }
    return true;
};

const validateEmailFormat = (email, message) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert(message);
        return false;
    }
    return true;
};

const validateDateFormat = (date, message) => {
    if (isNaN(Date.parse(date))) {
        alert(message);
        return false;
    }
    return true;
};

const validateSalary = (salary, message) => {
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    if (!salaryRegex.test(salary) || parseFloat(salary) <= 0) {
        alert(message);
        return false;
    }
    return true;
};

const validateBoolean = (value, message) => {
    if (typeof value !== 'boolean') {
        alert(message);
        return false;
    }
    return true;
};



