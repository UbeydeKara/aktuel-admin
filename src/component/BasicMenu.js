import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Menu} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../hook/useLocalStorage";

export default function BasicMenu({anchorEl, setAnchorEl}) {
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [, setUser] = useLocalStorage("loggedUser");

    const handleLogout = () => {
        setUser(null);
        navigate("/login");
    }

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Çıkış Yap</ListItemText>
            </MenuItem>
        </Menu>
    );
}
