import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'
import Layout from "./pages/layout/layout";
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import LandingPage from "./pages/landing-page";


const lightTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2563EB',   // Blue 600
      dark: '#9b189bff',   // Blue 800
      light: '#3B82F6',  // Blue 500
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#DB2777',   // Pink 600
      dark: '#BE185D',   // Pink 700
      light: '#c96496ff',  // Pink 500
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F3F4F6', // Zinc 100 – soft gray
      paper: '#FFFFFF',   // pure white for surfaces
    },

    text: {
      primary: '#111827',   // Gray 900
      secondary: 'white', // Gray 600
      disabled: 'white',  // Gray 400
    },

    divider: 'rgba(0,0,0,0.12)',

    success: {
      main: '#16A34A',      // Green 600
      contrastText: '#FFFFFF',
    },

    warning: {
      main: '#D97706',      // Amber 600
      contrastText: '#FFFFFF',
    },

    error: {
      main: '#DC2626',       // Red 600
      contrastText: '#FFFFFF',
    },
  },
});



const darkTheme = createTheme({
  zIndex: {
    drawer: 900,
    appBar: 1201,
  },

  palette: {
    mode: 'dark',

    // Neutral DARK palette — NO blue, NO pink
    primary: {
      main: '#2D2D2D',      // dark gray
      light: '#3C3C3C',
      dark: '#1F1F1F',
      contrastText: '#F5F5F5',
    },

    secondary: {
      main: '#3A3A3A',      // slightly different gray
      light: '#4A4A4A',
      dark: '#2A2A2A',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#0E0E0E',   // almost black (not pure #000)
      paper: '#1A1A1A',     // for cards, drawers, menus
    },

    text: {
      primary: '#E4E4E4',    // soft white
      secondary: '#E4E4E4',  // muted gray
      disabled: '#E4E4E4',
    },

    divider: 'rgba(255,255,255,0.08)',

    // Notifications still need color — but dark-friendly
    success: {
      main: '#1E8F4A',   // dark green
      contrastText: '#FFFFFF',
    },

    warning: {
      main: '#C47F0E',   // darker amber
      contrastText: '#000000',
    },

    error: {
      main: '#B53131',   // darker red
      contrastText: '#FFFFFF',
    },
  },
});






function App() {
  // const [count, setCount] = useState(0)
  // const getWorkday = useUsers();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/app" element={<Layout />}>


            <Route index element={<Box >HOME</Box>} />
            <Route path="products" element={<>TEST1</>} />
            <Route path="pricing" element={<>TEST2</>} />
            <Route path="blog" element={<Box sx={{ mt: 10 }}>TEST3</Box>} />

          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App













// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import InfoIcon from "@mui/icons-material/Info";
// import type { Navigation } from "@toolpad/core/AppProvider";

// const theme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
// });

// const NAVIGATION: Navigation = [
//   {
//     kind: "header",
//     title: "Main"
//   },
//   {
//     segment: "",
//     title: "Home",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "about",
//     title: "About",
//     icon: <InfoIcon />,
//   },
// ];

// function App() {
//   return (
//     <AppProvider navigation={NAVIGATION} theme={theme}>
//       <BrowserRouter>
//         <DashboardLayout>
//           <Routes >
//             <Route path="/" element={<>TEST1</>} />
//             <Route path="/about" element={<>TEST2</>} />
//           </Routes>
//         </DashboardLayout>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;




