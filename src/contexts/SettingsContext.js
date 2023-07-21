import PropTypes from 'prop-types';
import {createContext} from 'react';
// hooks
import useLocalStorage from '../hook/useLocalStorage';

// ----------------------------------------------------------------------

const initialState = {
    themeMode: 'light',
    onToggleMode: () => {
    }
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

SettingsProvider.propTypes = {
    children: PropTypes.node,
};

function SettingsProvider({children}) {
    const [settings, setSettings] = useLocalStorage('settings', {
        themeMode: initialState.themeMode
    });

    const onToggleMode = () => {
        setSettings({
            ...settings,
            themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
        });
    };

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                onToggleMode
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export {SettingsProvider, SettingsContext};
