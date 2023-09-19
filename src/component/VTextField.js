import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';

VTextField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    Icon: PropTypes.object,
    iconColor: PropTypes.string,
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool
}

VTextField.defaultProps = {
    iconColor: 'default',
    fullWidth: false
};

export default function VTextField({name, value, placeholder, onChange, Icon, iconColor, helperText, fullWidth}) {
    const error = value === "";

    return(
        <TextField
            name={name}
            value={value}
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <Icon color={error ? "error" : "default"} sx={{color: iconColor}}/>
                </InputAdornment>)
            }}
            sx={{
                '& ::placeholder': {
                    color: error && "red"
                }
            }}
            onChange={onChange}
            error={error}
            helperText={error ? "Bu alan gerekli" : helperText}
            fullWidth={fullWidth}/>
    )
}
