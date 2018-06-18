const isEmpty = (object) => {
    return !object || (typeof object === 'object' && Object.keys(object).length === 0);
}

module.exports = isEmpty