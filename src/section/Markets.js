import {Box, ButtonBase, Stack} from "@mui/material";

const toggleButton = (item, setSelectedMarket, isActive) => {
    return <ButtonBase key={item.marketID} sx={{borderRadius: 2, borderColor: "black"}}
                       onClick={() => setSelectedMarket(item)}>
        <Box width={110}
             component="img" height={60}
             src={item.img_path}
             loading="lazy" bgcolor={isActive ? item.tint : "divider"}
             px={{xs: 2, sm: 4}} borderRadius={2}/>
    </ButtonBase>
}

export default function Markets({markets, selectedMarket, setSelectedMarket}) {
    return (
        <Stack direction="row" spacing={2} p={2}>
            {markets.map(item => {
                return toggleButton(item, setSelectedMarket, selectedMarket.marketID === item.marketID);
            })}
        </Stack>
    );
}