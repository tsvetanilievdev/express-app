function whichBoxIsChecked(body, data) {
    const extras = data.map(x => Object.assign({ isOn: false }, x));

    let checkedExtras;
    if (Array.isArray(body)) {
        checkedExtras = body.map(k => k._id);

    } else {
        checkedExtras = Object.keys(body).filter(k => k.startsWith('box')).map(k => k.slice(4));
    }
    extras.forEach(x => {
        if (checkedExtras.some(c => c.toString() == x._id.toString())) {
            x.isOn = true;
        }

    })
    return extras;
}

module.exports = whichBoxIsChecked;