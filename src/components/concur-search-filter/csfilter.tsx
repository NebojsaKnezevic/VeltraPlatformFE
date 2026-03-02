import type { ChangeEvent, JSX } from "react";
import { Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, type SelectChangeEvent, type SxProps, type Theme, Divider } from "@mui/material";
import { useConcurSearchStore } from "../../store/concur-search-store";
import type { IFilter } from "../../models/query-filter-model";


interface FormTextField {
    type: string;
    label: string;
    gridSize: number;
    value: string;
    fn?: (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => void;
    onAction?: () => void;
}

const COMMON_STYLES: SxProps<Theme> = {
    width: {
        xs: '100%',
        sm: '100%',
        md: '30%',
        lg: '18.5%',
    },
    "& .MuiInputBase-input": {
        color: 'red',
    },
}

const INPUT_STYLES: SxProps<Theme> = {
    ...COMMON_STYLES,
    bgcolor: 'white',
}

const SELECT_STYLES: SxProps<Theme> = {
    ...COMMON_STYLES,
}



export const CSFilter = (): JSX.Element => {
    const filter = useConcurSearchStore((s) => s.queryFilter);
    const setFilter = useConcurSearchStore((s) => s.setQueryFilter);

    const data: FormTextField[] = [
        {
            type: "TextField",
            label: "geid",
            gridSize: 3,
            value: filter?.geid === undefined ? "" : filter.geid,
            fn: (e) => setFilter({ ...filter, geid: e.target.value } as IFilter),
        },
        {
            type: "TextField",
            label: "email",
            gridSize: 3,
            value: filter?.email === undefined ? "" : filter.email,
            fn: (e) => setFilter({ ...filter, email: e.target.value } as IFilter),
        },
        {
            type: "TextField",
            label: "firstname",
            gridSize: 3,
            value: filter?.firstName === undefined ? "" : filter.firstName,
            fn: (e) => setFilter({ ...filter, firstName: e.target.value } as IFilter),
        },
        {
            type: "TextField",
            label: "lastname",
            gridSize: 3,
            value: filter?.lastName === undefined ? "" : filter.lastName,
            fn: (e) => setFilter({ ...filter, lastName: e.target.value } as IFilter),
        },
        {
            type: "Select",
            label: "country",
            gridSize: 3,
            value: filter?.country === undefined ? "" : filter.country,
            fn: (e) => setFilter({ ...filter, country: e.target.value } as IFilter),
        },
        {
            type: "Select",
            label: "payroll",
            gridSize: 3,
            value: filter?.payroll === undefined ? "" : filter.payroll,
            fn: (e) => setFilter({ ...filter, payroll: e.target.value } as IFilter),
        },
        {
            type: "Button",
            label: "reset",
            gridSize: 1,
            value: filter?.payroll === undefined ? "" : filter.payroll,
            onAction: () =>
                setFilter({
                    page: 1,
                    limit: 5,
                    orderby: "GEID",
                    geid: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    country: "",
                    payroll: "",
                }),
        },
    ];
    return (
        <Box sx={{ p: 0, width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Paper elevation={0} sx={{ p: 0, width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', mt: 2, p: 2, flexWrap: 'wrap' }} >
                    {data.map((x, i) => {
                        let element: JSX.Element;

                        if (x.type === "TextField") {
                            element = (
                                <TextField
                                    size="small"
                                    id="outlined-basic"
                                    label={x.label.toUpperCase()}
                                    variant="outlined"
                                    onChange={x.fn}
                                    value={x.value}
                                    sx={INPUT_STYLES}
                                />
                            );
                        } else if (x.type === "Select") {
                            element = (
                                <FormControl fullWidth size="small" sx={SELECT_STYLES}>

                                    <InputLabel id={`label-${x.label}`}>{x.label.toUpperCase()}</InputLabel>

                                    <Select
                                        labelId={`label-${x.label}`}
                                        id={`select-${x.label}`}
                                        value={x.value}
                                        label={x.label.toUpperCase()}
                                        onChange={x.fn}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            );
                        } else if (x.type === "Button") {
                            element = <Button onClick={x.onAction}>{x.label}</Button>;
                        } else {
                            element = <Box>Wrong type, check concur-search.tsx</Box>;
                        }

                        return (
                            <>
                                {element}
                            </>
                        );
                    })}



                </Box>

            </Paper>
            <Divider sx={{ width: '80%' }} />
        </Box>

    );
}