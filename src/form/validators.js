import {checkEmail, checkMax, checkMin, checkNumber, checkUsername} from "./helpers";

export const validateLogin = values => {
    const errors = {};
    const requiredFields = [
        'email',
        'password',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'This field is required'
        }
    });
    return errors
};

export const validateRegister = values => {
    const errors = {};
    const requiredFields = [
        'username',
        'email',
        'password',
        'confirmPassword'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'This field is required'
        }
    });

    if (values.username) {
        const value = values.username;
        if (checkMin(3, value)) {
            errors.username = `Must be 3 characters or more`;
        } else if (checkMax(100, value)) {
            errors.username = `Must be no more than 100 characters`;
        } else if (checkUsername(value)) {
            errors.username = 'Name must be like a human';
        }
    }

    if (values.email && checkEmail(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (values.confirmPassword && values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match'
    }
    if (values.password && checkMin(6, values.password)) {
        errors.password = `Must be 6 characters or more`;
    }
    return errors
};

export const validateTransaction = values => {
    const errors = {};
    const requiredFields = [
        'name',
        'amount',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'This field is required'
        }
    });
    if (values.amount && checkNumber(values.amount)) {
        errors.amount = 'Must be a integer number'
    }

    return errors
};




