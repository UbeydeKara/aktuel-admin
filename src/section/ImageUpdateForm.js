import {Button, Chip, Dialog, DialogActions, DialogContent, Divider, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export default function ImageUpdateForm({selectedRow, setSelectedRow, handleUpdate}) {
    const [images, setImages] = useState([]);
    const [isSelected, setSelected] = useState(false);

    const title = selectedRow.field === "images" ? "Kataloglar" : "Ürünler";
    const subtitle = selectedRow.field === "images" ? "Katalog" : "Ürün";

    const handleSave = () => {
        handleUpdate({...selectedRow, [selectedRow.field]: images});
        handleClose();
    }

    const handleClose = () => {
        setSelectedRow({});
        setSelected(false);
    }

    const handleChange = (event, index) => {
        const path = event.target.value;
        const newArray = Array.from(images);
        newArray[index] = path;
        setImages(newArray);
    }

    const removeItem = (index) => {
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
            <DialogContent>
                <Typography variant="h4">{title} ({images.length})</Typography>
                {images.map((item, index) => {
                    return <Stack spacing={2} key={index}>
                        <Divider sx={{mt: 2}}>
                            <Chip label={subtitle + " " + (index + 1)}/>
                        </Divider>
                        <img src={item || selectedRow} alt="Görsel yüklenemedi" style={{maxWidth: 500, borderRadius: 10}}/>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Link: </Typography>
                            <TextField placeholder="Görsel (URL)" size="small" defaultValue={item}
                                       onChange={e => handleChange(e, index)} sx={{width: "100%"}}/>
                            <Button onClick={() => removeItem(index)} color="error">Sil</Button>
                        </Stack>
                    </Stack>
                })}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleNewImage} sx={{mr: "auto"}}>Yeni {subtitle}</Button>
                <Button variant="contained" onClick={handleSave}>Kaydet</Button>
                <Button onClick={handleClose}>Kapat</Button>
            </DialogActions>
        </Dialog>
    )
}
