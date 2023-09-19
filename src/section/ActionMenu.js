import {Button, Divider, Fade, Grow, Stack, Typography} from "@mui/material";
import {Add, DeleteTwoTone, ErrorTwoTone, NotificationsNone, SettingsTwoTone} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useEffect, useState} from "react";
import RemoveDialog from "./dialogs/RemoveDialog";
import moment from "moment/moment";
import {TransitionGroup} from "react-transition-group";
import {removeCatalogs} from "../redux/actions/CatalogAction";

export default function ActionMenu({setRecordOpen, setNotifyOpen, setMarketControl}) {
    const {selectedMarketId} = useSelector(state => state.markets);
    const {catalogs} = useSelector(state => state.catalogs);
    const {selectedRowIds} = useSelector(state => state.data);

    const expiredCatalogs = catalogs.filter(x => moment(x.deadline) < moment()).length;

    // Remove Dialog
    const [removeControl, setRemoveControl] = useState({open: false});

    const [fade, setFade] = useState(true);
    const [btnGroup, setBtnGroup] = useState([]);

    const dispatch = useDispatch();

    const marketControl = () => (
        setMarketControl({
            open: true,
            isEdit: true
        })
    )

    const removeRows = () => (
        dispatch(removeCatalogs(selectedRowIds)).finally(
            () => {
                setRemoveControl({open: false});
            }
        )
    )

    const handleRemove = () => {
        setRemoveControl({
            open: true,
            title: "Seçili " + selectedRowIds.length + " katalog silinsin mi?",
            body: "Bu katalogları silmek istediğinizden emin misiniz? Bu işlemi geri alamazsınız.",
            action: removeRows
        })
    };

    const MarketEditButton = (
        <Button startIcon={<SettingsTwoTone/>} onClick={marketControl} sx={{overflow: "hidden"}}>
            Marketi Düzenle
        </Button>
    );

    const RemoveRowsButton = (
        <Button color="error" startIcon={<DeleteTwoTone/>} onClick={handleRemove} sx={{overflow: "hidden"}}>
            Satırları Sil
        </Button>
    );

    useEffect(() => {
        let tmp = [];

        if (selectedMarketId.length > 0)
            tmp.push(MarketEditButton)

        if (selectedRowIds.length > 0)
            tmp.push(RemoveRowsButton)

        setBtnGroup(tmp);

    }, [selectedMarketId, selectedRowIds]);

    return(
        <div>
            <Stack direction={{md: "row"}} spacing={2} py={2} px={3} my={2} gap={{xs: 1, md: 0}} bgcolor="#537da73d" borderRadius={4} overflow="hidden">

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" startIcon={<Add/>} onClick={() => setRecordOpen(true)}>Katalog Ekle</Button>
                    <Button variant="outlined" startIcon={<NotificationsNone/>} onClick={() => setNotifyOpen(true)}>Bildirim Gönder</Button>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Grow in={Boolean(btnGroup.length > 0)}>
                        <Divider orientation="vertical" flexItem/>
                    </Grow>
                    <TransitionGroup>
                        {btnGroup.map((item, index) => (
                            <Grow key={index}>
                                {item}
                            </Grow>
                        ))}
                    </TransitionGroup>
                </Stack>

                <Fade in={Boolean(expiredCatalogs > 0)}>
                    <Stack direction="row" spacing={1} alignItems="center" ml={{md: "auto !important"}}>
                        <Fade in={fade} timeout={1000} onEntered={() => setFade(false)} onExited={() => setFade(true)}>
                            <ErrorTwoTone/>
                        </Fade>
                        <Typography variant="body2"><b>{expiredCatalogs}</b> adet tarihi geçen katalog bulunuyor</Typography>
                    </Stack>
                </Fade>
            </Stack>

            <RemoveDialog removeControl={removeControl} setRemoveControl={setRemoveControl}/>
        </div>
    )
}
