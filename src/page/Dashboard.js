import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Fade, Typography} from "@mui/material";
import {getAllCatalogs} from "../redux/actions/CatalogAction";
import {getAllMarkets} from "../redux/actions/MarketAction";
import {OverlayCard, SweetAlert, UserAvatar} from "../component";
import {DashboardTable, ImageUpdateForm, MarketForm, MarketMenu, Record} from "../section";
import HelloDialog from "../section/dialogs/HelloDialog";
import PushNotification from "../section/dialogs/PushNotification";
import ActionMenu from "../section/ActionMenu";

export default function Dashboard() {

    // image
    const [selectedRow, setSelectedRow] = useState({});

    // Record
    const [recordIsOpen, setRecordOpen] = useState(false);

    // Notification
    const [notifyIsOpen, setNotifyOpen] = useState(false);

    // Market Form
    const [marketControl, setMarketControl] = useState({
        open: false,
        isEdit: false
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMarkets());
        dispatch(getAllCatalogs());
    }, [dispatch]);

    return (
        <Fade in timeout={800}>
            <div style={{paddingBottom: 40}}>
                <OverlayCard>
                    {/*<Stack direction="row">*/}
                    <Typography variant="h4" color="white">Aktüel Dashboard</Typography>
                    {/*    <Divider orientation="vertical" flexItem sx={{color: "white", ml: 1}}/>*/}
                    {/*    <Divider orientation="vertical" flexItem sx={{color: "white", mr: 1}}/>*/}
                    {/*    <IconButton sx={{color: "white"}}>*/}
                    {/*        <LightModeTwoTone/>*/}
                    {/*    </IconButton>*/}
                    {/*</Stack>*/}
                    <UserAvatar/>
                </OverlayCard>

                <MarketMenu setMarketControl={setMarketControl}/>

                <ActionMenu
                    setNotifyOpen={setNotifyOpen}
                    setRecordOpen={setRecordOpen}
                    setMarketControl={setMarketControl}/>

                <DashboardTable
                    setSelectedRow={setSelectedRow}/>

                <MarketForm
                    marketControl={marketControl}
                    setMarketControl={setMarketControl}/>

                <Record
                    open={recordIsOpen}
                    setOpen={setRecordOpen}/>

                <ImageUpdateForm
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}/>

                <PushNotification open={notifyIsOpen} setOpen={setNotifyOpen}/>

                <SweetAlert/>

                <HelloDialog/>


            </div>
        </Fade>
    );
}
