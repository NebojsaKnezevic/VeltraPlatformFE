import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiResponse } from "../../../models/api-response";
import { TableCell, TableRow } from "@mui/material";

// Definišemo uniju tipova koje tvoja tabela podržava
type AnyModel = any; // Ili: IHrgtModel | IHRGTdwModel | IConcurModel

interface ICSRows {
    // Koristimo query bez obzira na to koji je tačan model unutra
    query: UseQueryResult<ApiResponse<AnyModel[]>, Error>;
    headerNames: string[];
}

export const CSRows = (props: ICSRows) => {
    const { query, headerNames } = props;

    // 1. Handlujemo loading ili error stanja ako je potrebno
    if (query.isLoading) return null;
    if (!query.data?.data) return null;

    return (
        <>
            {query.data.data.map((row: AnyModel, rowIndex: number) => (
                <TableRow
                    key={row.Geid || rowIndex} // Koristimo Geid ili index kao fallback
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {headerNames.map((columnName, i) => {
                        // Dinamički pristupamo polju na osnovu stringa iz headerNames
                        const cellValue = row[columnName];

                        return (
                            <TableCell
                                component="th"
                                scope="row"
                                key={`${rowIndex}-kkk${i}`}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    width: 'auto',
                                    minWidth: 'max-content',
                                    // padding: '8px 16px' // Malo paddinga da ne bude slepljeno
                                }}
                            >
                                {cellValue !== null && cellValue !== undefined
                                    ? String(cellValue)
                                    : "-"}
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </>
    );
};