import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Dashboard from "../page/Dashboard";
import Login from "../page/Login";
import Page from "./Page";
import {useEffect} from "react";
import useLocalStorage from "../hook/useLocalStorage";
import {userExpired} from "../utils/auth";

export default function Router() {
    const [user] = useLocalStorage("loggedUser");
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (user && !userExpired(user)) {
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
