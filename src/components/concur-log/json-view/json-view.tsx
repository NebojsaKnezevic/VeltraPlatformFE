import { type ChangeEvent, type JSX } from "react";
import JsonView from "@uiw/react-json-view";
import { Pagination, Stack, } from "@mui/material";
import type { ILogsDashboardFilter } from "../../../models/logs-dashboard-model";

interface ICustomJsonView {
    logFilter: ILogsDashboardFilter;
    setLogsFilter: (filter: ILogsDashboardFilter) => void;
    logsData: { data: any };
}

export default function CustomJsonView(props: ICustomJsonView): JSX.Element {
    const { logFilter, setLogsFilter, logsData } = props;

    return (
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
                    color: "#81b88b",
                }}
            /></>
    );
}
