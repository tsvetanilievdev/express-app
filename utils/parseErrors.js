function parseErrors(error) {
    //check for mongoose error = ValidationError
    if (error.name == 'ValidationError') {
        return Object.keys(error.errors).map(x => error.errors[x].message);
    }
    if (Array.isArray(error)) {
        //check for express validator error
        return error
    } else {
        //check for thrown error
        return [error.message];
    }

}


function parseExpressValidatorErrors(isValid) {
    return isValid.errors.map(x => x.msg);
}

function parseMissingFields(data) {
    let missing = Object.entries(data).filter(([k, v]) => !v);
    if (missing.length > 0) {
        missing = missing.map(k => `The ${k[0]} field is required!`);
    }
    return missing

}
module.exports = {
    parseErrors,
    parseExpressValidatorErrors,
    parseMissingFields
}