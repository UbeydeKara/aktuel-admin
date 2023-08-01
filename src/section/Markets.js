import {Box, ButtonBase, Divider, IconButton, Stack, Tooltip} from "@mui/material";
import {MarketForm} from "./index";
import * as React from "react";
import {useState} from "react";
import {Add, Apps} from "@mui/icons-material";

const toggleButton = (item, setSelectedMarket, isActive) => {
    return <Tooltip title={item.title} key={item.marketID}>
        <ButtonBase sx={{borderRadius: 2, boxShadow: 1}}
                    onClick={() => setSelectedMarket(item.marketID)}>
            <Box width={110}
                 component="img" height={60}
                 src={item.img_path}
                 loading="lazy" bgcolor={isActive ? item.tint : "divider"}
                 px={4} py={1} borderRadius={2} alt="Görsel yüklenemedi"/>
        </ButtonBase>
    </Tooltip>
}

export default function Markets({markets, setMarkets, selectedMarket, setSelectedMarket}) {
    const [formOpen, setOpen] = useState(false);
    const btnStyle = {width: 60, height: 60, borderRadius: 2, bgcolor: "divider"}

    return (
        <Box width="100%" overflow="auto">
            <Stack direction="row" spacing={2} p={2} minWidth={800}>
                <Tooltip title="Yeni market ekle">
                <IconButton onClick={() => setOpen(true)} sx={btnStyle}>
                    <Add />
                </IconButton>
                </Tooltip>
                <Tooltip title="Tümünü göster">
                    <IconButton onClick={() => setSelectedMarket("")}
                                sx={selectedMarket ? {...btnStyle, bgcolor: "divider"} : {...btnStyle, bgcolor: "#b6b9c5"}}>
                        <Apps />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" variant="middle" flexItem/>
                {markets.map(item => {
                    return toggleButton(item, setSelectedMarket, selectedMarket === item.marketID);
                })}
            </Stack>
            <MarketForm markets={markets} setMarkets={setMarkets} open={formOpen} setOpen={setOpen}/>
        </Box>
    );
}
