import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiResponse } from "../../../../models/api-response";
import { TableCell, TableRow } from "@mui/material";

interface ICSRows<T> {
    query: UseQueryResult<ApiResponse<T[]>, Error>;
    headerNames: string[];
}

export const CSRows = <T,>(props: ICSRows<T>) => {
    const { query, headerNames } = props;

    if (query.isLoading) return null;
    if (!query.data?.data) return null;

    return (
        <>
            {query.data.data.map((row, rowIndex) => {

                const record = row as Record<string, unknown>;
                const rowKey = (record.Geid as string | number) || rowIndex;

                return (
                    <TableRow
                        key={rowKey}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {headerNames.map((columnName, i) => {
                            const cellValue = record[columnName];

                            return (
                                <TableCell
                                    component="th"
                                    scope="row"
                                    key={`${rowIndex}-kkk${i}`}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        width: 'auto',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    {cellValue !== null && cellValue !== undefined
                                        ? String(cellValue)
                                        : "-"}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </>
    );
};