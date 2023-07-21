import './App.css';

import '@fontsource/public-sans/300.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/700.css';

import Router from "./section/Router";
import ThemeProvider from "./theme";

export default function App() {
    return (
        <ThemeProvider>
            <Router/>
        </ThemeProvider>
    );
}