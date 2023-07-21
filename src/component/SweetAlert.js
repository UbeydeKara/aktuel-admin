import {Alert, Snackbar} from "@mui/material";

export default function SweetAlert({open, setOpen, message}) {
    return(
        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert severity="warning" onClose={() => setOpen(false)}>
                {message}
            </Alert>
        </Snackbar>
    );
}