import { Box } from "@mui/material";
import Navbar from "./navbar/navbar";
import { Outlet } from "react-router-dom";
// import LeftDrawer from "./drawer/drawer";

export default function Layout() {
  return (
    <Box sx={{ width: '100%', height: '100%' }} >
      <Navbar />
      {/* <LeftDrawer/> */}
      <Box sx={{ p: 2, mt: 8 }}>
        <Outlet />
      </Box>

    </Box>
  );
}

