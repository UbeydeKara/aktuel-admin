import {useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, MenuItem, Select, Stack, Typography} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/tr';

import {AutoCompleteField} from "../component";

export default function Record({open, setOpen, markets, handleSave}) {
    const [values, setValues] = useState({});
    const [market, setMarket] = useState(-1);

    const dateChange = (event, name) => {
        const value = event._d;
        setValues({...values, [name]: value});
    };

    const selectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const marketObj = markets.find(x => x.marketID === value);
        setMarket(value);
        setValues({...values, [name]: marketObj});
    };

    const saveChanges = () => {
        handleSave(values);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent sx={{minWidth: {sm: 600}}}>
                <Stack spacing={2} mb={1} px={2}>
                    <Typography variant="h4" mb={4}>Yeni Katalog</Typography>

                    <Select value={market}
                            name="market" onChange={selectChange} fullWidth displayEmpty>
                        <MenuItem value={-1} disabled>Market</MenuItem>
                        {markets.map(item => {
                            return <MenuItem key={item.marketID} value={item.marketID}>{item.title}</MenuItem>
                        })}
                    </Select>

                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="tr">
                            <DatePicker
                                label="Kampanya Başlangıç"
                                onChange={e => dateChange(e, "startAt")}
                                sx={{width: "100%"}}/>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="tr">
                            <DatePicker
                                label="Kampanya Bitiş"
                                onChange={e => dateChange(e, "deadline")}
                                sx={{width: "100%"}}/>
                        </LocalizationProvider>
                    </Stack>
                    <AutoCompleteField
                        field="images"
                        label="Katalog Görselleri"
                        values={values}
                        setValues={setValues}/>
                    <AutoCompleteField
                        field="products"
                        label="Ürün Görselleri"
                        values={values}
                        setValues={setValues}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} variant="contained">Kaydet</Button>
                <Button onClick={handleClose}>Kapat</Button>
            </DialogActions>
        </Dialog>
    )
}