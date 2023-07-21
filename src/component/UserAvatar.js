import * as React from "react";
import {useState} from "react";
import {Avatar, ButtonBase, Stack, Typography} from "@mui/material";
import BasicMenu from "./BasicMenu";
import useLocalStorage from "../hook/useLocalStorage";

export default function UserAvatar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const {getValue} = useLocalStorage();

    return(
        <ButtonBase sx={{p: 1, borderRadius: 10}}>
            <Stack direction="row" spacing={1} alignItems="center"
                   onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar src="/static/profile.png"/>
                <Typography color="white">{getValue()?.username}</Typography>
            </Stack>
            <BasicMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </ButtonBase>
    );
}