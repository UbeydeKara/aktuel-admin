import {Box, FormControl, FormHelperText, MenuItem, Select, Stack} from "@mui/material";
import * as React from "react";

export default function SweetSelect({data, values, setValues, field, label, Icon}) {
    const error = values[field] === "";

    const handleChange = (event) => {
        const item = event.target.value;
        setValues({...values, [field]: item[field]});
    };

    return(
        <FormControl error={error}>
            <Select
                onChange={handleChange}
                renderValue={(item) => {
                    return (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Icon sx={{color: error ? "error.main" : "grey.600"}}/>
                            <Box sx={{color: error ? "error.main" : item === undefined && "text.secondary"}}>
                                {!Boolean(item) ? label : item.title}
                            </Box>
                        </Stack>
                    );
                }}
                fullWidth
                displayEmpty>
                {data.map((item, index) => {
                    return <MenuItem key={index} value={item}>{item.title}</MenuItem>
                })}
            </Select>
            <FormHelperText>{error && "Bu alan gerekli"}</FormHelperText>
        </FormControl>
    )
}
