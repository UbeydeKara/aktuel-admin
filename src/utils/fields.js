export const checkFields = (values, setValues, fields) => {
    let _values = {...values};

    if (_values.length < 2) return false;

    let status = true;
    fields.forEach((x) => {
        if (_values[x] === "") status = false; else if (_values[x] === undefined) {
            status = false;
            _values[x] = "";
        }
    });

    setValues(_values);
    return status;
};
