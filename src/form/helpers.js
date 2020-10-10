export function checkMin(min, value) {
    return value.length < min
}

export function checkMax(max, value) {
    return value.length > max
}

export function checkEmail(email) {
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !reg.test(email)
}

export function checkUsername(username) {
    const reg = /^[a-zA-ZА-Яа-я '&-]*[A-Za-zА-Яа-яё]$/i;
    return !reg.test(username)
}

export function checkNumber(num) {
    return !Number.isInteger(typeof 'string' ? +num : num)
}