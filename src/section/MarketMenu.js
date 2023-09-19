import {Box, ButtonBase, Divider, Grow, IconButton, Stack, Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useRef} from "react";
import {Add, Apps} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {selectMarket} from "../redux/actions/MarketAction";

const toggleButton = (item, isActive, dispatch) => {
    return <Tooltip title={item.title} key={item.marketID}>
        <ButtonBase sx={{borderRadius: 2, boxShadow: 1}}
                    onClick={() => dispatch(selectMarket(item.marketID))}>
            <Box minWidth={110} maxWidth={110}
                 component="img" height={60}
                 src={item.img_path}
                 loading="lazy" bgcolor={isActive ? item.tint : "divider"}
                 px={3} py={2} borderRadius={2} alt="Görsel yüklenemedi"/>
        </ButtonBase>
    </Tooltip>
}

export default function MarketMenu({setMarketControl}) {
    const btnStyle = {width: 60, height: 60, borderRadius: 2, bgcolor: "divider"}
    const dispatch = useDispatch();
    const {markets, selectedMarketId} = useSelector(state => state.markets);
    const stackRef = useRef();

    const marketControl = () => (
        setMarketControl({
            open: true,
            isEdit: false
        })
    )

    useEffect(() => {
        if(!stackRef.current)
            return;
        stackRef.current.addEventListener('wheel', (event) => {
            event.preventDefault();

            stackRef.current.scrollBy({
                left: event.deltaY < 0 ? -30 : 30,

            });
        });
    }, [stackRef.current]);

    return (
        <Box>
            <Stack ref={stackRef} direction="row" spacing={2} p={2} overflow="auto">
                <Tooltip title="Yeni market ekle">
                <IconButton onClick={marketControl} sx={btnStyle}>
                    <Add />
                </IconButton>
                </Tooltip>
                <Tooltip title="Tümünü göster">
                    <IconButton onClick={() => dispatch(selectMarket(""))}
                                sx={selectedMarketId ? {...btnStyle, bgcolor: "divider"} : {...btnStyle, bgcolor: "#b6b9c5"}}>
                        <Apps />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" variant="middle" flexItem/>
                    {markets.map((item, index) => (
                        <Grow in={Boolean(item.marketID)} key={item.marketID} style={{ transitionDelay: (100 * index) + 'ms' }}>
                            {toggleButton(item, selectedMarketId === item.marketID, dispatch)}
                        </Grow>
                    ))}
            </Stack>
        </Box>
    );
}
