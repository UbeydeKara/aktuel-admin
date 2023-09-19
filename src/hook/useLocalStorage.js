import PropTypes from "prop-types";
import {useState} from "react";

useLocalStorage.propTypes = {
    key: PropTypes.string.isRequired,
    initialValue: PropTypes.any
}

export default function useLocalStorage(key, initialValue) {

    const currentValue = () => {
        const valueInStorage = localStorage.getItem(key);

        if (valueInStorage)
            return JSON.parse(valueInStorage);

        if (initialValue)
            localStorage.setItem(key, JSON.stringify(initialValue));

        return initialValue;
    }

    const [value, setStateValue] = useState(currentValue());

    const setValue = (newValue) => {
        setStateValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, setValue];
}
