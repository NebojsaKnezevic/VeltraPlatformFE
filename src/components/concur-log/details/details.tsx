import type { JSX } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import JsonView from "@uiw/react-json-view";
import { useConcurLog, useConcurPayload } from "../../../query/hooks/concur-logs-dashboard";
import { DEFAULT_LOGS_DASHBOARD_FILTER } from "../../../models/logs-dashboard-model";
import { useQueryClient } from "@tanstack/react-query";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    p: 4,
    overflow: 'hidden', // Sprečava da ceo modal dobije svoj scrollbar
};

type DetailsProp = {
    provision_id: number;
    extension_name?: string;
}

export default function DetailsButton({ provision_id, extension_name }: DetailsProp): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const queryClient = useQueryClient();

    // Refresh ONLY provisionId 1
    queryClient.invalidateQueries({
        queryKey: ["ConcurProcessLog", 1]
    });

    const logs = useConcurLog(
        { ...DEFAULT_LOGS_DASHBOARD_FILTER, provision_id: provision_id, extension_name: "" },
        provision_id,
        open
    );

    const payload = useConcurPayload(provision_id, open);

    return (
        <div>
            <Button onClick={handleOpen}><VisibilityIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* RED 1: Dugme na vrhu */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, mt: 8 }}>
                        <Button onClick={handleClose} sx={{ minWidth: 'auto', p: 0 }}>
                            <ArrowBackIosIcon />
                            <ArrowBackIosIcon sx={{ marginLeft: '-14px' }} />
                            <ArrowBackIosIcon sx={{ marginLeft: '-14px' }} />
                        </Button>
                    </Box>


                    <Box sx={{ display: 'flex', flex: 1, gap: 2, overflow: 'hidden' }}>

                        {/* KOLONA 1: LOGS */}
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            overflowY: 'auto',
                            maxHeight: '100%',
                            overflowX: 'hidden'
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                                LOGS
                            </Typography>
                            {!logs.isPending && logs.data?.data && (
                                <JsonView
                                    value={logs.data?.data}
                                    collapsed={false}
                                    shortenTextAfterLength={0}
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    style={{ color: "#81b88b" }}
                                />
                            )}
                        </Box>

                        {/* KOLONA 2: PAYLOAD */}
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            overflowY: 'auto',
                            maxHeight: '100%'
                        }}>
                            <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mb: 1 }}>
                                PAYLOAD
                            </Typography>
                            {!payload.isPending && payload.data?.data?.payload && (
                                <JsonView
                                    value={JSON.parse(payload.data.data.payload)}
                                    collapsed={false}
                                    shortenTextAfterLength={0}
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    style={{ color: "#81b88b" }}


                                />
                            )}
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </div>
    );
}