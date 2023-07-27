import * as React from 'react';
import {useEffect, useState} from 'react';
import {Badge, Fade, Typography} from "@mui/material";
import UserAvatar from "../component/UserAvatar";
import OverlayCard from "../component/OverlayCard";
import SweetAlert from "../component/SweetAlert";
import {DashboardTable, ImageUpdateForm, Markets, Record} from "../section";
import {CatalogService, MarketService} from "../service";

export default function Dashboard() {

    // image
    const [selectedRow, setSelectedRow] = useState({});

    // alert
    const [alertOpen, setAlert] = useState(false);

    // data
    const [data, setData] = useState([]);

    // Record
    const [recordIsOpen, setRecordOpen] = useState(false);

    // Markets
    const [selectedMarket, setSelectedMarket] = useState({});
    const [markets, setMarkets] = useState([]);

    const handleData = async () => {
        if(Object.keys(selectedMarket).length === 0)
            return null;

        await CatalogService.findAllByMarket(selectedMarket).then(
            (res) => {
                setData(res.data.data);
            }
        ).catch(
            (res) => {
                setAlert(true);
            }
        )
    };

    const handleGetMarkets = async () => {
        await MarketService.getMarkets().then(
            (res) => {
                const marketResponse = res.data.data;
                setMarkets(marketResponse);
                setSelectedMarket(marketResponse[0].marketID);
            }
        ).catch(
            (err) => {
                return Promise.reject([]);
            }
        )
    };

    const handleSave = async (row) => {
        const updateRequest = {...row, marketID: row.market.marketID}
        await CatalogService.save(updateRequest).then(
            (res) => {
                const newState = [...data, res.data.data];
                setData(newState);
            }
        ).catch(
            (res) => {
                setAlert(true);
            }
        )
    }

    const handleUpdate = async (row) => {
        const updateRequest = {...row, marketID: row.market.marketID}
        await CatalogService.update(updateRequest).then((res) => {
            const newState = data.map(obj => {
                if (obj.catalogID === updateRequest.catalogID)
                    return res.data.data;
                return obj;
            });
            setData(newState);
        })
    }

    const handleDelete = async (selectedRows) => {
        await CatalogService.deleteByIds(selectedRows).then(
            (res) => {
                setData(
                    data.filter((r) => selectedRows.filter((sr) => sr === r.catalogID).length < 1)
                );
            }
        ).catch(
            (res) => {
                setAlert(true);
            }
        )
    }

    useEffect(() => {
        handleGetMarkets();
    }, []);

    useEffect(() => {
        handleData();
    }, [selectedMarket]);

    return (
        <Fade in timeout={800}>
            <div style={{paddingBottom: 40}}>
                <OverlayCard>
                    <Badge badgeContent="Beta" color="info">
                        <Typography variant="h4" color="white">Aktüel Dashboard</Typography>
                    </Badge>
                    <UserAvatar/>
                </OverlayCard>

                <Markets
                    markets={markets}
                    setMarkets={setMarkets}
                    selectedMarket={selectedMarket}
                    setSelectedMarket={setSelectedMarket}/>

                <DashboardTable
                    markets={markets}
                    data={data}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    setSelectedRow={setSelectedRow}
                    setRecordOpen={setRecordOpen}/>

                <Record
                    markets={markets}
                    open={recordIsOpen}
                    setOpen={setRecordOpen}
                    handleSave={handleSave}/>

                <ImageUpdateForm
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    handleUpdate={handleUpdate}/>

                <SweetAlert open={alertOpen} setOpen={setAlert} message="Sunucuya Bağlanılamadı"/>
            </div>
        </Fade>
    );
}