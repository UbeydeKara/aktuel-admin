import {
    Badge,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {Add, CheckTwoTone, Close, DeleteTwoTone, ImageTwoTone, LinkTwoTone} from "@mui/icons-material";
import {setErrorImage} from "../utils/imageError";
import {useDispatch} from "react-redux";
import {updateCatalog} from "../redux/actions/CatalogAction";

export default function ImageUpdateForm({selectedRow, setSelectedRow}) {
    const [images, setImages] = useState([]);
    const [isSelected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);

    const isCatalog = selectedRow.field === "images";

    const title = selectedRow.field === "images" ? "Kataloglar" : "Ürünler";
    const subtitle = selectedRow.field === "images" ? "Katalog" : "Ürün";

    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const handleSave = () => {
        setLoading(true);
        dispatch(updateCatalog({
            ...selectedRow,
            [selectedRow.field]: images,
            marketID: selectedRow.market.marketID
        })).then(handleClose).catch(() => setLoading(false));
    }

    const handleClose = () => {
        setSelectedRow({});
        setSelected(false);
        setLoading(false);
        setError(false);
    }

    const handleChange = (event, index) => {
        const path = event.target.value;
        const newArray = Array.from(images);
        newArray[index] = path;
        setImages(newArray);
    }

    const removeItem = (index) => {
        if (isCatalog && images.length === 1) {
            setError(true);
            return true;
        }
        const newArr = [...images]
        newArr.splice(index, 1);
        setImages(newArr);
    }

    const handleNewImage = () => {
        if (images[images.length - 1] !== "")
            setImages([...images, ""]);
    }

    useEffect(() => {
        if (Object.keys(selectedRow).length !== 0) {
            setImages(selectedRow[selectedRow.field]);
            setSelected(true);
        }
    }, [selectedRow]);

    return (
        <Dialog open={isSelected} sx={{my: 6}}>
            <DialogContent sx={{minWidth: {sm: 600}}}>
                <Stack spacing={2} direction="row" alignItems="center" mb={2}>
                    <ListItem>
                        <ListItemIcon>
                            <ImageTwoTone fontSize="large"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Badge badgeContent={images.length} color="primary" sx={{
                                    '& .MuiBadge-badge': {
                                        right: -20,
                                        top: 10
                                    }}}>
                                    <Typography variant="h4">{title}</Typography>
                                </Badge>
                            }
                            secondary={(isCatalog ? "Katalogları" : "Ürünleri") + " düzenleyin"}/>
                    </ListItem>
                    <IconButton color="primary" sx={{ml: "auto !important;"}} onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Stack>

                {images.map((item, index) => {
                    return <Stack spacing={2} key={index} sx={{mt: 2}}>
                        <Divider>
                            <Chip label={subtitle + " " + (index + 1)}/>
                        </Divider>
                        <Box component="img" src={item || selectedRow} alt="Görsel yüklenemedi" onError={setErrorImage}
                             sx={{maxWidth: 500, borderRadius: 2, mx: "auto !important", objectFit: "contain"}}/>
                        <Stack direction="row" spacing={1}>

                            <TextField placeholder="Görsel (URL)" size="small" defaultValue={item}
                                       onChange={e => handleChange(e, index)} sx={{width: "100%"}}
                                       InputProps={{
                                           startAdornment: (<InputAdornment position="start">
                                               <LinkTwoTone/>
                                           </InputAdornment>)
                                       }}
                                        error={error}
                                        helperText={error && "En az bir katalog görseli olmalı."}/>

                            <IconButton onClick={() => removeItem(index)} color="error" sx={{height: "fit-content"}}>
                                <DeleteTwoTone/>
                            </IconButton>

                        </Stack>
                    </Stack>
                })}
            </DialogContent>
            <DialogActions sx={{bgcolor: "divider", py: 2}}>
                <Button variant="outlined" onClick={handleNewImage} sx={{mr: "auto"}} startIcon={<Add/>}>Yeni {subtitle}</Button>
                <Button onClick={handleClose}>İptal</Button>

                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    onClick={handleSave}
                    variant="contained"
                    startIcon={<CheckTwoTone/>}>
                    Kaydet
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
