import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

export default function Page() {
    return (
        <Container sx={{minHeight: "100vh"}}>
            <Outlet/>
        </Container>
    );
}