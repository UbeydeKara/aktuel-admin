import {forwardRef} from "react";
import {Slide} from "@mui/material";

export const ModalTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
