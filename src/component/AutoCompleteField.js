import {Autocomplete, createFilterOptions, InputAdornment, TextField} from "@mui/material";
import {setErrorImage} from "../utils/imageError";
import {useEffect, useState} from "react";

export default function AutoCompleteField({field, label, values, setValues, helperText, Icon}) {
    const filter = createFilterOptions();
    const [error, setError] = useState(values[field] === "");
    const [errorLabel, setErrorLabel] = useState("Bu alan gerekli");

    const autoCompleteChange = (event, newValue) => {
        const last = newValue.slice(-1)[0];

        if (last.includes("token")) {
            setErrorLabel("Geçici bir görsel bağlantısı eklediniz. " +
                "Lütfen içerisinde 'token' ifadesi bulunmayan bir bağlantı ekleyiniz.");
            setError(true);
            newValue.pop();
        }

        else
            setValues({...values, [field]: newValue});
    }

    useEffect(() => {
        if (values[field] === "") {
            setErrorLabel("Bu alan gerekli");
            setError(true);
        }
        else
            setError(false);
    }, [values]);

    return(
        <Autocomplete
            options={[]}
            fullWidth
            multiple
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const {inputValue} = params;
                const isExisting = options.some((option) => inputValue === option);

                if (inputValue !== '' && !isExisting) {
                    filtered.push(inputValue);
                }

                return filtered;
            }}
            getOptionLabel={(option) => {
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option;
            }}
            renderOption={(props, option) =>
                <img {...props} src={option} alt="Görsel yüklenemedi" loading="lazy" onError={setErrorImage}/>}

            onChange={autoCompleteChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={label}
                    error={error}
                    helperText={error ? errorLabel : helperText}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <>
                                <InputAdornment position="start">
                                    <Icon color={error ? "error" : "default"}/>
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                            </>
                        )
                    }}
                    sx={{
                        '& ::placeholder': {
                            color: error && "red"
                        },
                        '& .MuiAutocomplete-tag': values[field]?.length > 0 && {
                            maxWidth: "calc(100% - 40px)",
                            marginLeft: "auto"
                        },
                        '& .MuiAutocomplete-input': values[field]?.length > 0 && {
                            width: "unset",
                            marginLeft: "40px"
                        }
                    }}
                />
            )}
        />
    )
}
