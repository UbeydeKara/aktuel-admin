const initialKey = "loggedUser";
export default function useLocalStorage() {

    const getValue = () => {
        return JSON.parse(localStorage.getItem(initialKey));
    }

    const setValue = (newValue) => {
        const value = JSON.stringify(newValue);
        localStorage.setItem(initialKey, value);
    };

    const removeItem = () => {
        localStorage.removeItem(initialKey);
    };

    return {getValue, setValue, removeItem};
}
