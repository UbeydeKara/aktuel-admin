import {Button, Dialog, DialogActions, DialogContent, IconButton, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Done} from "@mui/icons-material";

export default function ImageZoom({selectedRow, setSelectedRow, handleUpdate}) {
    const [img_path, setImg] = useState("");
    const [isSelected, setSelected] = useState(false);

    const handleSave = () => {
        handleUpdate({...selectedRow, img_path: img_path});
        setSelectedRow({});
    }

    const handleClose = () => {
        setSelectedRow({});
    }

    useEffect(() => {
        setImg(selectedRow.img_path);
        setSelected(Object.keys(selectedRow).length !== 0);
    }, [selectedRow]);

    return (
        <Dialog
            open={isSelected}>
            <DialogContent>
                <Typography variant="h4">Katalog Görsel</Typography>
                <Stack direction="row" spacing={1} alignItems="center" my={2}>
                    <Typography>Link: </Typography>
                    <TextField placeholder="Görsel (URL)" size="small" defaultValue={selectedRow?.img_path}
                               onChange={e => setImg(e.target.value)} sx={{width: "100%"}}/>
                    {img_path !== selectedRow?.img_path &&
                        <IconButton aria-label="save" color="success" onClick={handleSave}>
                            <Done/>
                        </IconButton>}
                </Stack>
                <img src={img_path || selectedRow?.img_path} alt="sevde" style={{maxWidth: 500}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Kapat</Button>
            </DialogActions>
        </Dialog>
    )
}