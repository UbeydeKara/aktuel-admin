import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../page/Dashboard";
import Login from "../page/Login";
import Page from "./Page";
import {useEffect} from "react";
import useLocalStorage from "../hook/useLocalStorage";

export default function Router() {
    const {getValue} = useLocalStorage();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        const user = getValue();
        if (user !== null) {
            navigate("/dashboard");
        }
        else if(location.pathname !== "/login") {
            navigate("/login");
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Page/>}>
                <Route path="dashboard" index element={<Dashboard/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
    );
}
