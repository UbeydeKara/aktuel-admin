import * as React from "react";
import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {CheckTwoTone, Close, DeleteTwoTone, Link, Square, Store, StorefrontTwoTone} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addMarket, deleteMarket, updateMarket} from "../../redux/actions/MarketAction";
import {ModalTransition} from "../../utils/ModalTransition";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoadingButton from "@mui/lab/LoadingButton";
import RemoveDialog from "./RemoveDialog";
import {checkFields} from "../../utils/fields";
import VTextField from "../../component/VTextField";

const fields = ["title", "tint", "img_path"];

export default function MarketForm({marketControl, setMarketControl}) {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const {markets, selectedMarketId} = useSelector(state => state.markets);
    const selectedMarket = markets.find(x => x.marketID === selectedMarketId);

    const dispatch = useDispatch();

    // Remove Dialog
    const [removeControl, setRemoveControl] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({...values, [name]: value});
    };

    const saveChanges = () => {
        if (checkFields(values, setValues, fields))
            dispatch(marketControl.isEdit ? updateMarket(values) : addMarket(values)).then(handleClose);
    }

    const handleClose = () => {
        setLoading(false);
        setMarketControl({isOpen: false});
        setValues({});
    }

    const actionRemove = () => {
        dispatch(deleteMarket(selectedMarket)).then(
            () => {
                handleClose();
            }).finally(
            () => {
                setLoading(false);
                setRemoveControl({open: false});
            }
        )
    };

    const handleRemove = () => {
        setRemoveControl({
            open: true,
            title: selectedMarket?.title + " marketi silinsin mi?",
            body: "Bu marketi silmek istediğinizden emin misiniz? Bu işlemi geri alamazsınız.",
            action: actionRemove
        })
    };

    useEffect(() => {
        if(marketControl.isEdit)
            setValues(selectedMarket);
    }, [marketControl.isEdit]);

    return (
        <Box>
            <Dialog
                open={Boolean(marketControl.open)}
                TransitionComponent={ModalTransition}>
                <DialogContent sx={{minWidth: {sm: 600}}}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <ListItem>
                            <ListItemIcon>
                                <StorefrontTwoTone fontSize="large"/>
                            </ListItemIcon>

                            <ListItemText
                                primary={<Typography variant="h4">{marketControl.isEdit ? "Market Düzenle" : "Yeni Market"}</Typography>}
                                secondary={marketControl.isEdit ? (selectedMarket?.title + " marketini düzenleyin") : "Yeni market oluşturun"}/>
                        </ListItem>

                        <IconButton color="primary" sx={{ml: "auto !important;"}} onClick={handleClose}>
                            <Close/>
                        </IconButton>
                    </Stack>
                    <Divider sx={{mt: 2, mb: 3}}/>
                    <Stack spacing={2} px={4} alignItems="center">

                        <Avatar
                            sx={{width: 150, height: 150, bgcolor: values.tint || "#C4CDD5", boxShadow: values.tint === "white" && 24}}
                            imgProps={{sx: {width: 100, height: 100, objectFit: "contain"}}}
                            src={values.img_path}
                            alt="market-logo">
                            <StorefrontTwoTone sx={{fontSize: 100}}/>
                        </Avatar>

                        <Typography variant="caption" color="text.secondary">
                            Bilgileri girdiğinizde market logosunun önizlemesini burada göreceksiniz
                        </Typography>

                        <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                            <VTextField
                                name="title"
                                value={values.title}
                                placeholder="Market Adı"
                                onChange={handleChange}
                                Icon={Store}
                                fullWidth/>
                            <VTextField
                                name="tint"
                                value={values.tint}
                                placeholder="Renk"
                                onChange={handleChange}
                                Icon={Square}
                                iconColor={values.tint}
                                fullWidth/>
                        </Stack>

                    <VTextField
                        name="img_path"
                        value={values.img_path}
                        placeholder="Logo"
                        onChange={handleChange}
                        Icon={Link}
                        helperText="Market logosu mutlaka geçerli bir svg dosyası olmalıdır."
                        fullWidth/>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{bgcolor: "divider", py: 2}}>

                    {marketControl.isEdit && <Button
                        color="error"
                        onClick={handleRemove}
                        variant="contained"
                        startIcon={<DeleteTwoTone/>}
                        sx={{mr: "auto"}}>
                        Sil
                    </Button>}

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

            <RemoveDialog removeControl={removeControl} setRemoveControl={setRemoveControl}/>
        </Box>)
}
