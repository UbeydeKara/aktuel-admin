import {Autocomplete, createFilterOptions, TextField} from "@mui/material";

export default function AutoCompleteField({field, label, values, setValues}) {
    const filter = createFilterOptions();

    const autoCompleteChange = (event, newValue) => {
        setValues({...values, [field]: newValue});
    }

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
                <img {...props} src={option} alt="Sevde" loading="lazy"/>}

            onChange={autoCompleteChange}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                />
            )}
        />
    )
}