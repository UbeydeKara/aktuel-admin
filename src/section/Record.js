import {
    Autocomplete,
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/tr';
import MenuItem from "@mui/material/MenuItem";

export default function Record({open, setOpen, markets, handleSave}) {
    const [values, setValues] = useState({});
    const [market, setMarket] = useState(-1);
    const filter = createFilterOptions()

    const textfieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({...values, [name]: value});
    };

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

    const autoCompleteChange = (event, newValue) => {
        setValues({...values, products: newValue});
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent sx={{minWidth: {sm: 600}}}>
                <Stack spacing={2} mb={1} px={2}>
                    <Typography variant="h4" mb={4}>Yeni Katalog</Typography>

                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <Select value={market}
                                name="market" onChange={selectChange} fullWidth displayEmpty>
                            <MenuItem value={-1} disabled>Market</MenuItem>
                            {markets.map(item => {
                                return <MenuItem key={item.marketID} value={item.marketID}>{item.title}</MenuItem>
                            })}
                        </Select>
                        <TextField label="Katalog Görsel" name="img_path" onChange={textfieldChange} fullWidth/>
                    </Stack>

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
                    <Autocomplete
                        options={[]}
                        fullWidth
                        multiple
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const {inputValue} = params;
                            const isExisting = options.some((option) => inputValue === option.img_path);

                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    img_path: inputValue
                                });
                            }

                            return filtered;
                        }}
                        getOptionLabel={(option) => {
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.img_path;
                        }}
                        renderOption={(props, option) =>
                            <img {...props} src={option.img_path} alt="Sevde" loading="lazy"/>}

                        onChange={autoCompleteChange}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ürün Görselleri"
                            />
                        )}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} variant="contained">Kaydet</Button>
                <Button onClick={handleClose}>Kapat</Button>
            </DialogActions>
        </Dialog>
    )
}