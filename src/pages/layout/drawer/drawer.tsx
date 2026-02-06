import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./style.css"
import { Link } from "react-router-dom";

const pages = [
  { label: 'Concur-Search', path: '/app/ConcurSearch' },
  { label: 'POWER-BI', path: '/app/PowerBI' },
  { label: 'Manual-Update', path: '/app/ManualUpdate' },
];
export default function LeftDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        // SET OPEN UVEK FALSE
        // setOpen(false);
    };

    const DrawerList = (
    <Box sx={{ width: 250, mt: 8 }} role="presentation">
        <List className={"CUSTOM-DRAWER-BOX"}> 
            {pages.map((p, index) => (
                <ListItem key={index} disablePadding>
 
                    <ListItemButton 
                        component={Link} 
                        to={p.path}
                        onClick={toggleDrawer(false)} 
                    >
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={p.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
);

    return (
        <div >
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(!open)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} hideBackdrop id={"CUSTOM-DRAWER"}  sx={{zIndex: 1}}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
