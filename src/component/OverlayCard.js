import {Stack} from "@mui/material";

const searchCard = {
    height: 200,
    background: '#172337',
    backgroundImage: 'url(http://37.148.212.156/static/bg.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow: 'inset 0 0 0 2000px #172337d9',
    alignItems: 'center',
    justifyContent: {sm: "space-between", xs: "space-evenly"}
}

export default function OverlayCard({ children }) {
    return (
        <Stack direction={{xs: "column", sm: "row"}} paddingX={4} sx={searchCard}>
            {children}
        </Stack>
    )

}
