import {useState} from "react";
import {useDispatch} from "react-redux";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {Close, Message, NotificationsNoneTwoTone, Send, Title} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';

import {ModalTransition} from "../../utils/ModalTransition";
import {pushNotification} from "../../redux/actions/NotificationAction";
import {checkFields} from "../../utils/fields";
import VTextField from "../../component/VTextField";

const fields = ["title", "body"];

export default function PushNotification({open, setOpen}) {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({...values, [name]: value});
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
        setValues({});
    }

    const sendNotification = () => {
        if (checkFields(values, setValues, fields)) {
            setLoading(true);
            dispatch(pushNotification(values))
                .then(handleClose)
                .catch(() => setLoading(false));
        }
    }

    return (<Dialog
        open={open}
        TransitionComponent={ModalTransition}>
        <DialogContent sx={{minWidth: {sm: 600}}}>
            <Stack spacing={2} direction="row" alignItems="center">
                <ListItem>
                    <ListItemIcon>
                        <NotificationsNoneTwoTone fontSize="large"/>
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h4">Bildirim Gönder</Typography>}
                        secondary="Uygulamanın yüklü olduğu tüm kullanıcılara bildirim gider"/>
                </ListItem>
                <IconButton color="primary" sx={{ml: "auto !important;"}} onClick={handleClose}>
                    <Close/>
                </IconButton>
            </Stack>
            <Divider sx={{mt: 2, mb: 3}}/>
            <Stack spacing={2} px={4}>

                <VTextField
                    value={values.title}
                    name="title"
                    placeholder="Başlık"
                    Icon={Title}
                    onChange={handleChange}/>

                <VTextField
                    value={values.body}
                    name="body"
                    placeholder="Mesaj"
                    Icon={Message}
                    onChange={handleChange}/>

            </Stack>
        </DialogContent>
        <DialogActions sx={{bgcolor: "divider", py: 2}}>

            <Button onClick={handleClose}>İptal</Button>

            <LoadingButton
                loading={loading}
                loadingPosition="end"
                onClick={sendNotification}
                variant="contained"
                endIcon={<Send/>}>
                Gönder
            </LoadingButton>

        </DialogActions>
    </Dialog>)
}
