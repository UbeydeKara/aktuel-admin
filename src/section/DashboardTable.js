import {useCallback, useState} from "react";
import {DataGrid, trTR} from "@mui/x-data-grid";
import {Box, Button, Stack} from "@mui/material";
import moment from "moment/moment";
import {Error} from "@mui/icons-material";
import clsx from "clsx";

export default function DashboardTable({data, handleUpdate, handleDelete, setSelectedRow, setRecordOpen}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        { field: 'catalogID', headerName: 'ID', flex: 1, minWidth: 120 },
        { field: 'market', headerName: 'Market', flex: 1, minWidth: 120,
            valueFormatter: (params) => `${params.value.title}` },
        { field: 'images', headerName: 'Kataloglar', flex: 1, minWidth: 120,
            renderCell: (params) =>
                <img src={params.value[0]} alt="Görsel yüklenemedi" width="100%" style={{objectFit: "contain"}}
                     loading="lazy"/>},
        { field: 'products', headerName: 'Ürünler', flex: 1, minWidth: 120,
            renderCell: (params) =>
                params.value.length > 0 ?
                <img src={params.value[0]} alt="Görsel yüklenemedi" width="100%" style={{objectFit: "contain"}}
                     loading="lazy"/> :
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Error fontSize="small"/>
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
                    negative: moment(params?.value).add(1, 'day') .isBefore()
                })
            },}
    ];

    const handleRowSelection = (e) => {
        setSelectedRows(e);
    };

    const handleCellClick = (params) => {
        if (params.field === "images" || params.field === "products") {
            setSelectedRow({...params.row, field: params.field});
        }
    }

    const updateRow = useCallback((newRow, oldRow) => {
        handleUpdate(newRow);
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
                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                rows={data}
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
            <Stack direction="row" spacing={1} mt={2}>
                <Button variant="outlined" onClick={() => setRecordOpen(true)}>Katalog Ekle</Button>
                {selectedRows.length > 0 &&
                    <Button variant="outlined" color="error"
                            onClick={() => handleDelete(selectedRows)}>Seçilenleri Sil</Button>}
            </Stack>
        </Box>
    )
}
