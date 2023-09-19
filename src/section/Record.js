import * as React from "react";
import {useState} from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider, FormControlLabel,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack, Switch,
    Typography
} from "@mui/material";

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/tr';

import {AutoCompleteField} from "../component";
import {useDispatch, useSelector} from "react-redux";
import {ModalTransition} from "../utils/ModalTransition";
import {ArticleTwoTone, CheckTwoTone, Close, ImageTwoTone, StorefrontTwoTone} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {checkFields} from "../utils/fields";
import SweetSelect from "../component/SweetSelect";
import moment from "moment/moment";
import {saveCatalog} from "../redux/actions/CatalogAction";
import {pushNotification} from "../redux/actions/NotificationAction";

const fields = ["marketID", "startAt", "deadline", "images"];

export default function Record({open, setOpen}) {
    const [values, setValues] = useState({});
    const {markets} = useSelector(state => state.markets);

    const [notifyUsers, setNotify] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const dateChange = (event, name) => {
        const value = event._d;
        setValues({...values, [name]: value});
    };

    const switchChange = (event) => {
        setNotify(event.target.checked);
    };

    const saveChanges = async() => {
        if (checkFields(values, setValues, fields)) {
            setLoading(true);

            if (notifyUsers) {
                const market = markets.find(x => x.marketID === values.marketID);
                await dispatch(pushNotification({
                    title: "Yeni " + market.title + " kataloğu sizlerle 🎉",
                    message: market.title + " marketine ait " + values.startAt + " kataloğunu inceleyin"
                })).catch(() => setLoading(false));
            }

            await dispatch(saveCatalog(values))
                .then(handleClose)
                .catch(() => setLoading(false));
        }
    }

    const handleClose = () => {
        setValues({});
        setLoading(false);
        setNotify(false);
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={ModalTransition}>
            <DialogContent sx={{minWidth: {sm: 600}}}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <ListItem>
                        <ListItemIcon>
                            <ArticleTwoTone fontSize="large"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="h4">Katalog Ekle</Typography>}
                            secondary="Bir marketin indirim kataloğunu ekleyin"/>
                    </ListItem>
                    <IconButton color="primary" sx={{ml: "auto !important;"}} onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Stack>

                <Divider sx={{mt: 2, mb: 3}}/>

                <Stack spacing={2} px={4}>
                    <SweetSelect
                        data={markets}
                        values={values}
                        setValues={setValues}
                        field="marketID"
                        label="Market"
                        Icon={StorefrontTwoTone}/>

                    <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="tr">
                            <DatePicker
                                onChange={e => dateChange(e, "startAt")}
                                slotProps={{
                                    textField: {
                                        placeholder: "Kampanya Başlangıç",
                                        helperText: values.startAt === "" && "Tarih seçmediniz",
                                        error: values.startAt === "",
                                        sx: {
                                            '& ::placeholder, & .MuiIconButton-root': {
                                                color: values.startAt === "" && "error.main"
                                            },
                                            width: "100%"
                                        }
                                    }
                                }}
                                minDate={moment().add(-1, "year")}
                                maxDate={moment().add(1, "year")}/>
                            <DatePicker
                                onChange={e => dateChange(e, "deadline")}
                                slotProps={{
                                    textField: {
                                        placeholder: "Kampanya Bitiş",
                                        helperText: values.deadline === "" && "Tarih seçmediniz",
                                        error: values.deadline === "",
                                        sx: {
                                            '& ::placeholder, & .MuiIconButton-root': {
                                                color: values.deadline === "" && "error.main"
                                            },
                                            width: "100%"
                                        }
                                    }
                                }}
                                minDate={moment()}
                                maxDate={moment().add(1, "year")}/>
                        </LocalizationProvider>
                    </Stack>

                    <AutoCompleteField
                        Icon={ImageTwoTone}
                        field="images"
                        label="Katalog Görseli"
                        values={values}
                        setValues={setValues}
                        helperText="Lütfen belirli bir süre sonunda geçerliliğini yitirmeyen görsel url adresleri kullanın."/>

                    <AutoCompleteField
                        Icon={ImageTwoTone}
                        field="products"
                        label="Ürün Görseli"
                        values={values}
                        setValues={setValues}
                        helperText="Lütfen belirli bir süre sonunda geçerliliğini yitirmeyen görsel url adresleri kullanın."/>
                </Stack>
            </DialogContent>
            <DialogActions sx={{bgcolor: "divider", py: 2}}>
                <FormControlLabel control={<Switch onChange={switchChange}/>}
                                  label="Kullanıcıları bilgilendir"
                                  sx={{mr: "auto"}} />

                <Button onClick={handleClose}>İptal</Button>

                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    onClick={saveChanges}
                    variant="contained"
                    startIcon={<CheckTwoTone/>}>
                    Kaydet
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
