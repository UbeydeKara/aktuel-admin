import {Box, ButtonBase, Divider, IconButton, Stack} from "@mui/material";
import {MarketForm} from "./index";
import * as React from "react";
import {useState} from "react";
import {Add} from "@mui/icons-material";

const toggleButton = (item, setSelectedMarket, isActive) => {
    return <ButtonBase key={item.marketID} sx={{borderRadius: 2, boxShadow: 1}}
                       onClick={() => setSelectedMarket(item.marketID)}>
        <Box width={110}
             component="img" height={60}
             src={item.img_path}
             loading="lazy" bgcolor={isActive ? item.tint : "divider"}
             px={{xs: 2, sm: 4}} borderRadius={2}/>
    </ButtonBase>
}

const formButton = (setOpen) => {
    return <IconButton onClick={() => setOpen(true)} sx={{width: 60, height: 60, borderRadius: 2, bgcolor: "divider"}}>
        <Add />
    </IconButton>
}

export default function Markets({markets, setMarkets, selectedMarket, setSelectedMarket}) {
    const [formOpen, setOpen] = useState(false);
    return (
        <>
            <Stack direction="row" spacing={2} p={2}>
                {formButton(setOpen)}
                <Divider orientation="vertical" variant="middle" flexItem/>
                {markets.map(item => {
                    return toggleButton(item, setSelectedMarket, selectedMarket === item.marketID);
                })}
            </Stack>
            <MarketForm markets={markets} setMarkets={setMarkets} open={formOpen} setOpen={setOpen}/>
        </>
    );
}