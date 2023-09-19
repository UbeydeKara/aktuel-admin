import {Alert, AlertTitle, Slide, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
}

export default function SweetAlert() {
    const {id, variant, title, message} = useSelector(state => state.alert);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (variant && message)
            setOpen(true);
    }, [id]);

    return(
        <Snackbar
            key={Slide.name}
            TransitionComponent={SlideTransition}
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}>
            <Alert severity={variant} sx={{boxShadow: 24, borderRadius: 1}}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
}
