import { useEffect, useRef, useState, type ChangeEvent, type JSX, type SyntheticEvent } from "react";
import { useConcurLogs } from "../../query/hooks/concur-logs-dashboard";
import JsonView from "@uiw/react-json-view";
import { Autocomplete, Box, Divider, Pagination, Stack, Tab, Tabs, TextField, type SxProps, type Theme } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLogsDashboardStore } from "../../store/concur-logs-dashboard-store";
import dayjs from 'dayjs';
import type { ILogsDashboardFilter, } from "../../models/logs-dashboard-model";
import TableView from "./table-view/table-view";


// const myCustomTheme = {
//     base00: '#81b88b', 
//     base01: '#383838',
//     base02: '#585858',
//     base03: '#b8b8b8',
//     base04: '#d8d8d8',
//     base05: '#e8e8e8', 
//     base06: '#f8f8f8',
//     base07: '#f8f8f8',
//     base08: '#ab4642', 
//     base09: '#dc9656', 
//     base0A: '#f7ca88', 
//     base0B: '#000000', 
//     base0C: '#86c1b9',
//     base0D: '#7cafc2', 
//     base0E: '#ba8baf',
//     base0F: '#a16946',
// };

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

const DATEPICKER_STYLES: SxProps<Theme> = {
    ...COMMON_STYLES,
    '& .MuiPickersInputBase-root': {
        color: 'red',
    },

    '& .MuiPickersInputBase-sectionContent': {
        color: 'red',
    },
}

export const CSDashboard = (): JSX.Element => {
    const logFilter: ILogsDashboardFilter = useLogsDashboardStore((s) => s.logsFilter);
    const setLogsFilter = useLogsDashboardStore((s) => s.setLogsFilter);
    // const [debouncedFilter, setDebouncedFilter] = useState(logFilter);
    const logsData = useConcurLogs(logFilter);
    const [geid, setGeid] = useState(logFilter.geid);
    // const [provisionID, setProvisionID] = useState(logFilter);


    useEffect(() => {

        logsData.refetch();

    }, [logFilter]);

    const x = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleGeidChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (x.current) clearTimeout(x.current);
        setGeid(e.target.value);
        x.current = setTimeout(() => setLogsFilter({ ...logFilter, geid: e.target.value }), 2000);
    }


    // console.log(logsData.data?.data.data.statusCodes[1]["status_code"])
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        // console.log(value)
    };



    if (logsData.isLoading) return <>LOADING...</>
    if (logsData.data === undefined) return <>Something went wrong</>

    const absoluteMin = dayjs(logsData.data.dateRange[0].min_date);
    const absoluteMax = dayjs(logsData.data.dateRange[0].max_date);
    const AUTO_FONT_SIZE = '0.7rem';

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '80%' }}>
                {/* {JSON.stringify(logFilter)} */}
                {/* <Box sx={{ bgcolor: 'lightgreen', width: '100%', height: 200, color: 'black' }}>FILTER</Box> */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', mt: 2, p: 2, flexWrap: 'wrap' }} >
                    <TextField
                        className="fontColor"
                        id="geid-input"
                        label="Geid"
                        variant="outlined"
                        size="small"
                        value={geid}
                        onChange={handleGeidChange}
                        sx={INPUT_STYLES}
                    />

                    <TextField
                        className="fontColor"
                        id="geid-input"
                        label="Provision ID"
                        variant="outlined"
                        size="small"
                        value={''}
                        onChange={handleGeidChange}
                        sx={INPUT_STYLES}
                    />


                    {/* 1. StatusCodes */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.statusCodes
                            .slice()
                            .sort((a, b) => a.status_code > b.status_code ? 1 : -1)}
                        getOptionLabel={(option) => option.status_code?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="StatusCodes" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.statusCodes[number] | null) => {
                            setLogsFilter({ ...logFilter, status_code: value?.status_code?.toString() ?? '' });
                        }}
                        value={logsData.data?.statusCodes.find(
                            (s) => s.status_code?.toString() === logFilter.status_code
                        ) ?? null}
                    />

                    {/* 2. StatusResults */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.statusResults
                            .slice()
                            .sort((a, b) => (a.status_result > b.status_result ? 1 : -1))}
                        getOptionLabel={(option) => option.status_result?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="StatusResults" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.statusResults[number] | null) => {
                            setLogsFilter({ ...logFilter, status_result: value?.status_result?.toString() ?? '' });
                        }}
                        value={logsData.data.statusResults.find(
                            (s) => s.status_result?.toString() === logFilter.status_result
                        ) ?? null}
                    />

                    {/* 3. MessageCodes */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.messageCodes
                            .slice()
                            .sort((a, b) => (a.message_code > b.message_code ? 1 : -1))}
                        getOptionLabel={(option) => option.message_code?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="MessageCodes" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.messageCodes[number] | null) => {
                            setLogsFilter({ ...logFilter, message_code: value?.message_code?.toString() ?? '' });
                        }}
                        value={logsData.data.messageCodes.find(
                            (s) => s.message_code?.toString() === logFilter.message_code
                        ) ?? null}
                    />

                    {/* 4. MessageTypes */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.messageTypes
                            .slice()
                            .sort((a, b) => (a.message_type > b.message_type ? 1 : -1))}
                        getOptionLabel={(option) => option.message_type?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="MessageTypes" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.messageTypes[number] | null) => {
                            setLogsFilter({ ...logFilter, message_type: value?.message_type?.toString() ?? '' });
                        }}
                        value={logsData.data.messageTypes.find(
                            (s) => s.message_type?.toString() === logFilter.message_type
                        ) ?? null}
                    />


                    {/* 4. MessageTypes */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.messageTexts
                            .slice()
                            .sort((a, b) => (a.message_text > b.message_text ? 1 : -1))}
                        getOptionLabel={(option) => option.message_text?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="MessageTexts" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.messageTexts[number] | null) => {
                            setLogsFilter({ ...logFilter, message_text: value?.message_text?.toString() ?? '' });
                        }}
                        value={logsData.data.messageTexts.find(
                            (s) => s.message_text?.toString() === logFilter.message_text
                        ) ?? null}
                    />


                    {/* 4. MessageTypes */}
                    <Autocomplete
                        size="small"
                        sx={SELECT_STYLES}
                        slotProps={{
                            listbox: {
                                sx: { fontSize: AUTO_FONT_SIZE }
                            }
                        }}
                        options={logsData.data.messagePaths
                            .slice()
                            .sort((a, b) => (a.message_path > b.message_path ? 1 : -1))}
                        getOptionLabel={(option) => option.message_path?.toString() ?? "NULL"}
                        renderInput={(params) => <TextField {...params} label="MessagePaths" />}
                        onChange={(_: SyntheticEvent, value: typeof logsData.data.messagePaths[number] | null) => {
                            setLogsFilter({ ...logFilter, message_path: value?.message_path?.toString() ?? '' });
                        }}
                        value={logsData.data.messagePaths.find(
                            (s) => s.message_path?.toString() === logFilter.message_path
                        ) ?? null}
                    />

                    <DatePicker
                        sx={DATEPICKER_STYLES}
                        label="From"
                        value={logFilter.from ? dayjs(logFilter.from) : null}
                        onChange={(newValue) => setLogsFilter({ ...logFilter, from: newValue ? newValue.format('YYYY-MM-DD') : '' })}
                        // Donja granica je fiksna, gornja ne sme preći "To" datum (ako postoji)
                        minDate={absoluteMin}
                        maxDate={logFilter.to ? dayjs(logFilter.to) : absoluteMax}
                        format="YYYY-MM-DD"
                        slotProps={{ textField: { size: 'small' } }}
                    />

                    {/* --- To Date Picker --- */}
                    <DatePicker
                        sx={DATEPICKER_STYLES}
                        label="To"
                        value={logFilter.to ? dayjs(logFilter.to) : null}
                        onChange={(newValue) => setLogsFilter({ ...logFilter, to: newValue ? newValue.format('YYYY-MM-DD') : '' })}
                        // Donja granica je "From" datum, gornja je fiksna
                        minDate={logFilter.from ? dayjs(logFilter.from) : absoluteMin}
                        maxDate={absoluteMax}
                        format="YYYY-MM-DD"
                        slotProps={{ textField: { size: 'small' } }}
                    />


                </Box>

                <Divider sx={{ my: 2 }} />

                {!logsData.isFetching ?

                    <Box sx={{ bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example"
                        >
                            <Tab label="Table view" />
                            <Tab label="JSON view" />

                        </Tabs>
                        {value === 0 && <TableView
                            paginationModel={{ page: logFilter.page, pageSize: logFilter.limit }}
                            concurResponse={logsData.data}
                            onPaginationModelChange={(m) => {
                                setLogsFilter({ ...logFilter, page: m.page, limit: m.pageSize })
                            }}
                        />}
                        {value === 1 &&
                            <>
                                <Stack spacing={1}>
                                    <Pagination
                                        siblingCount={5}
                                        boundaryCount={1}
                                        page={logFilter.page} size="small"
                                        count={Math.ceil(logsData.data.total / logsData.data.limit)}
                                        shape="rounded"
                                        onChange={(e: ChangeEvent<unknown>, num: number) => setLogsFilter({ ...logFilter, page: num })} />
                                    {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                                </Stack>
                                <JsonView
                                    value={logsData.data.data}
                                    collapsed={false}
                                    shortenTextAfterLength={0}
                                    displayDataTypes={false}
                                    displayObjectSize={false}

                                    style={{

                                        // backgroundColor: "#81b88b",
                                        color: "#81b88b",

                                    }}
                                />
                            </>

                        }
                    </Box>
                    :
                    <>Fetching....</>
                }

            </Box>

        </Box>
    );
}

