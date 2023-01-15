function whichBoxIsChecked(body, data) {
    const extras = data.map(x => Object.assign({ isOn: false }, x))
    const checkedExtras = body.extras = Object.keys(body).filter(k => k.startsWith('box')).map(k => k.slice(4))
    extras.forEach(x => {
        if (checkedExtras.some(c => c == x._id)) {
            x.isOn = true;
        }

    })
    return extras;
}

module.exports = whichBoxIsChecked;