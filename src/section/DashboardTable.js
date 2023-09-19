import * as React from "react";
import {useCallback} from "react";
import {DataGrid, trTR} from "@mui/x-data-grid";
import {Box, Stack} from "@mui/material";
import moment from "moment/moment";
import {UnarchiveTwoTone} from "@mui/icons-material";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedRows} from "../redux/actions/DataAction";
import {setErrorImage} from "../utils/imageError";
import {updateCatalog} from "../redux/actions/CatalogAction";

export default function DashboardTable({setSelectedRow}) {
    const {catalogs} = useSelector(state => state.catalogs);
    const {selectedMarketId} = useSelector(state => state.markets);
    const filteredCatalogs = catalogs.filter(x => !selectedMarketId || x.market.marketID === selectedMarketId);
    const dispatch = useDispatch();

    const columns = [
        { field: 'catalogID', headerName: 'ID', flex: 1, minWidth: 120 },
        { field: 'market', headerName: 'Market', flex: 1, minWidth: 120,
            valueFormatter: (params) => `${params.value.title}` },
        { field: 'images', headerName: 'Kataloglar', flex: 1, minWidth: 120,
            renderCell: (params) =>
                <img src={params.value[0]} alt="Görsel yüklenemedi" width="100%" style={{objectFit: "contain"}}
                     loading="lazy" onError={setErrorImage}/>},
        { field: 'products', headerName: 'Ürünler', flex: 1, minWidth: 120,
            renderCell: (params) =>
                params.value.length > 0 ?
                <img src={params.value[0]} alt="Görsel yüklenemedi" width="100%" style={{objectFit: "contain"}}
                     loading="lazy" onError={setErrorImage}/> :
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <UnarchiveTwoTone fontSize="small"/>
                        <span>Ürün yok</span>
                    </Stack>
        },
        { field: 'startAt', headerName: 'Kampanya Başlangıç', editable: true, flex: 1, minWidth: 150, type: 'date',
            valueFormatter: (params) =>
                `${moment(params?.value).locale("tr").format('DD MMMM YYYY') || ''}` },
        { field: 'deadline', headerName: 'Kampanya Bitiş', editable: true, flex: 1, minWidth: 150, type: 'date',
            valueFormatter: (params) =>
                `${moment(params?.value).locale("tr").format('DD MMMM YYYY') || ''}`,
            cellClassName: (params) => {
                return clsx('date', {
                    negative: moment(params?.value).add(1, 'day').isBefore()
                })
            },}
    ];

    const handleRowSelection = (e) => {
        dispatch(setSelectedRows(e));
    };

    const handleCellClick = (params) => {
        if (params.field === "images" || params.field === "products") {
            setSelectedRow({...params.row, field: params.field});
        }
    }

    const updateRow = useCallback((newRow, oldRow) => {
        dispatch(updateCatalog({
            ...newRow,
            marketID: newRow.market.marketID
        }))
        return newRow;
    }, []);


    const onProcessRowUpdateError = useCallback((error) => {
        console.error(error);
    }, []);

    return (
        <Box sx={{
            width: '100%',
            '& .date.negative': {
                color: 'red',
            }}}>
            <DataGrid
                sx={{bgcolor: "white", borderRadius: 4, boxShadow: 4}}
                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                rows={filteredCatalogs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 10},
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                getRowId={(row) => row.catalogID}
                onRowSelectionModelChange={handleRowSelection}
                onCellClick={handleCellClick}
                processRowUpdate={updateRow}
                onProcessRowUpdateError={onProcessRowUpdateError}
                disableRowSelectionOnClick
                checkboxSelection
            />
        </Box>
    )
}
