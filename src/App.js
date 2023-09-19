import './App.css';

import '@fontsource/public-sans/300.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/700.css';

import Router from "./section/Router";
import ThemeProvider from "./theme";
import {Provider} from "react-redux";
import store from "./redux/store";

export default function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Router/>
            </Provider>
        </ThemeProvider>
    );
}
