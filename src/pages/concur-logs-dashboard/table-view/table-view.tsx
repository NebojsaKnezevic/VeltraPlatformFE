import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { ConcurLogsResponse } from '../../../models/logs-dashboard-model';
import type { JSX } from 'react';

const columns: GridColDef[] = [
    { field: 'created', headerName: 'Created', width: 180 },
    { field: 'provision_id', headerName: 'Provision ID', width: 180 },
    { field: 'geid', headerName: 'GEID', width: 100 },
    { field: 'extension_name', headerName: 'Extension Name', width: 200 },
    { field: 'status_code', headerName: 'Status Code', width: 110 },
    { field: 'status_result', headerName: 'Status Result', width: 120 },
    { field: 'message_code', headerName: 'Message Code', width: 130 },
    { field: 'message_text', headerName: 'Message Text', width: 250 },
    { field: 'message_path', headerName: 'Message Path', width: 250 },
    { field: 'message_type', headerName: 'Message Type', width: 120 },
    { field: 'id', headerName: 'ID', width: 90 }

];


interface ITableView {
    concurResponse: ConcurLogsResponse;
    paginationModel: { page: number; pageSize: number };
    onPaginationModelChange: (model: any) => void;
    // loading?: boolean;
}


export default function TableView(props: ITableView): JSX.Element {
    const { concurResponse, paginationModel, onPaginationModelChange } = props;

    // const paginationModel = { page: 0, pageSize: 10 };
    return (
        <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid
                density="compact"
                rows={concurResponse?.data || []}
                columns={columns}

                paginationMode="server"
                rowCount={concurResponse?.total || 0}

                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}

                pageSizeOptions={[10, 25, 50, 100]}

                disableRowSelectionOnClick
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
