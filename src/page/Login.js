import {Alert, Button, Fade, Paper, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../hook/useLocalStorage";
import {ReactComponent as LoginVector} from '../asset/login.svg';

const initial_user = {
    id: 0,
    username: "Ahmet Güven",
    email: "ahmet",
    password: "30151530"
}

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {setValue} = useLocalStorage();

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email")
            setEmail(value);
        else
            setPassword(value);
    }

    const handleLogin = () => {
        if (email === initial_user.email && password === initial_user.password) {
            setValue(initial_user);
            navigate("/dashboard");
        } else {
            setOpen(true);
        }

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <Fade in timeout={800}>
            <div>
                <Stack direction={{xs: "column", sm: "row"}} alignItems="center" justifyContent="center"
                       sx={{minHeight: "100vh"}} spacing={4} onKeyDown={handleKeyDown}>
                    <Paper variant="sweet" elevation={4} sx={{width: {xs: "75%", sm: "50%"}, height: "100%"}}>
                        <LoginVector/>
                    </Paper>
                    <Stack sx={{width: {sm: "50%"}, px: {sm: 8}}} spacing={1}>
                        <Typography variant="h2">Aktüel Admin</Typography>
                        <br/>
                        <TextField placeholder="Email" size="small"
                                   name="email" onChange={handleInputChange}/>
                        <TextField placeholder="Şifre" size="small" type="password"
                                   name="pass" onChange={handleInputChange}/>
                        <br/>
                        <Button variant="contained" onClick={handleLogin}>Giriş</Button>
                    </Stack>
                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert severity="warning" onClose={handleClose}>
                            Hatalı email veya parola girdiniz
                        </Alert>
                    </Snackbar>
                </Stack>
            </div>
        </Fade>
    );
}