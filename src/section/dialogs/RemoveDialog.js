import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {Close, DeleteTwoTone} from "@mui/icons-material";
import {ModalTransition} from "../../utils/ModalTransition";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoadingButton from "@mui/lab/LoadingButton";
import {useEffect, useState} from "react";

export default function RemoveDialog({removeControl, setRemoveControl}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        removeControl.action();
    }

    const handleClose = () => {
        setRemoveControl({open: false});
    }

    useEffect(() => {
        setLoading(false);
    }, [removeControl.open]);

    return (<Dialog
        open={Boolean(removeControl.open)}
        TransitionComponent={ModalTransition}>
        <DialogContent sx={{minWidth: {sm: 600}}}>
            <Stack spacing={2} direction="row" alignItems="center">
                <ListItem>
                    <ListItemIcon>
                        <DeleteTwoTone fontSize="large"/>
                    </ListItemIcon>

                    <ListItemText
                        primary={<Typography variant="h4">{removeControl.title}</Typography>}
                        secondary={removeControl.body}/>
                </ListItem>

                <IconButton color="primary" sx={{ml: "auto !important;"}} onClick={handleClose}>
                    <Close/>
                </IconButton>
            </Stack>
        </DialogContent>
        <DialogActions sx={{bgcolor: "divider", py: 2}}>

            <Button onClick={handleClose}>İptal</Button>
            <LoadingButton
                loading={loading}
                loadingPosition="start"
                variant="contained"
                startIcon={<DeleteTwoTone/>}
                color="error"
                onClick={handleDelete}>
                    Tamamen Sil
            </LoadingButton>

        </DialogActions>
    </Dialog>)
}
