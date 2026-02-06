import { useEffect, useMemo, type JSX } from "react";
import { TableContainer, TableHead, Paper, Table, TableRow, TableBody, TableCell } from "@mui/material";
import type { IConcurModel } from "../../models/concur-model";
import { useConcurUsers, useHrgtdwUsers, useHrgtUsers } from "../../query/hooks/concur-search-main";
import { useConcurSearchStore } from "../../store/concur-search-store";
import type { IHrgtModel } from "../../models/hrgt-model";
import { CSRows } from "./row/csrows";



export const CSTable = (): JSX.Element => {
    const filter = useConcurSearchStore(c => c.queryFilter);
    const hrgtData = useHrgtUsers(filter);
    const concurData = useConcurUsers(filter);
    const hrgtdwData = useHrgtdwUsers(filter);

    const headerNames = useMemo(() => {
        const newSet = new Set<string>();

        if (hrgtData.isSuccess && hrgtData.data?.data && hrgtData.data.data.length > 0) {
            for (const el in hrgtData.data.data[0]) {
                newSet.add(el);
            }
        }

        if (concurData.isSuccess && concurData.data?.data && concurData.data.data.length > 0) {
            for (const el in concurData.data.data[0]) {
                newSet.add(el);
            }
        }

        if (hrgtdwData.isSuccess && hrgtdwData.data?.data && hrgtdwData.data.data.length > 0) {
            for (const el in hrgtdwData.data.data[0]) {
                newSet.add(el);
            }
        }

        // newSet.add("type")
        return [...newSet];
    }, [hrgtData, concurData, hrgtdwData]);

    useEffect(() => {
        const x = setTimeout(() => {
            hrgtData.refetch();
            concurData.refetch();
            hrgtdwData.refetch();
        }, 2000)

        return () => clearTimeout(x)
    }, [filter]);

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {headerNames.map((h) => {
                            return (<TableCell key={`${h}`} align="left">{h}</TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>

                    {/* --- CONCUR SEKCIJA --- */}
                    <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                        <TableCell colSpan={headerNames.length} sx={{ py: 1, fontWeight: 'bold', color: '#666' }}>
                            🔵 CONCUR
                            <span style={{ marginLeft: '10px', fontWeight: 'normal', color: '#666' }}>
                                | Pronađeno: {concurData.data?.data?.length || 0} zapisa
                            </span>
                        </TableCell>
                    </TableRow>
                    <CSRows query={concurData} headerNames={headerNames} />

                    {/* --- HRGT SEKCIJA --- */}
                    <TableRow sx={{ bgcolor: '#fff3e0', mt: 2 }}>
                        <TableCell colSpan={headerNames.length} sx={{ py: 1, fontWeight: 'bold', color: '#666' }}>
                            🟠 HRGT
                            <span style={{ marginLeft: '10px', fontWeight: 'normal', color: '#666' }}>
                                | Pronađeno: {hrgtData.data?.data?.length || 0} zapisa
                            </span>
                        </TableCell>
                    </TableRow>
                    <CSRows query={hrgtData} headerNames={headerNames} />

                    {/* --- HRGTDW SEKCIJA --- */}
                    <TableRow sx={{ bgcolor: '#fff3e0', mt: 2 }}>
                        <TableCell colSpan={headerNames.length} sx={{ py: 1, fontWeight: 'bold', color: '#666' }}>
                            🟠 HRGTDW
                            <span style={{ marginLeft: '10px', fontWeight: 'normal', color: '#666' }}>
                                | Pronađeno: {hrgtdwData.data?.data?.length || 0} zapisa
                            </span>
                        </TableCell>
                    </TableRow>
                    <CSRows query={hrgtdwData} headerNames={headerNames} />


                </TableBody>
            </Table>
        </TableContainer>
    );
}