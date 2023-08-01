import {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grow,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Link, Square, Store} from "@mui/icons-material";
import {MarketService} from "../service";

export default function MarketForm({open, setOpen, markets, setMarkets}) {
    const [values, setValues] = useState({});

    const textfieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({...values, [name]: value});
    };

    const saveChanges = async() => {
        await MarketService.save(values).then(
            (res) => {
                const marketResponse = res.data.data;
                setMarkets([...markets, marketResponse]);
            }
        )
        handleClose();
    }

    const handleClose = () => {
        setValues({});
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent sx={{maxWidth: 500}}>
                <Stack px={2}>
                    <Typography variant="h4" mb={4}>Yeni Market</Typography>
                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <TextField name="title" placeholder="Market" variant="outlined" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Store />
                                </InputAdornment>
                            ),
                        }} onChange={textfieldChange} />
                        <TextField name="tint" placeholder="Renk" variant="outlined" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Square sx={{color: values.tint}} />
                                </InputAdornment>
                            ),
                        }} onChange={textfieldChange} />
                    </Stack>
                    <TextField name="img_path" placeholder="Logo" variant="outlined" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Link />
                            </InputAdornment>
                        ),
                    }} onChange={textfieldChange} sx={{mt: 2}}/>
                </Stack>
            </DialogContent>
            <DialogActions sx={{alignItems: "flex-end", pt: "16px !important"}}>
                <Grow in={values.img_path}>
                        <Box component="img"
                             bgcolor={values.tint}
                             p={1.5}
                             borderRadius={2}
                            src={values.img_path}
                            alt="Görsel yüklenemedi"
                            mr="auto"
                            height={50}
                            width={80}/>
                </Grow>
                <Button onClick={saveChanges} variant="contained">Kaydet</Button>
                <Button onClick={handleClose}>Kapat</Button>
            </DialogActions>
        </Dialog>
    )
}
