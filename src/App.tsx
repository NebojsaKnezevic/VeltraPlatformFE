import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css'
import Layout from "./pages/layout/layout";
import { createTheme, ThemeProvider, CssBaseline, Box, type ThemeOptions } from '@mui/material';
import LandingPage from "./pages/landing-page";
import ConcurSearch from "./pages/concur-search/concur-search";


const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: { main: '#rgba(0, 0, 0, 0.54)' },
    secondary: { main: '#f50057' },
    error: { main: '#f44336' },
    warning: { main: '#ffa726' },
    info: { main: '#29b6f6' },
    success: { main: '#66bb6a' },

    text: {
      primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },

    divider: 'rgba(0, 0, 0, 0.12)',

    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
    },
  },

  shape: {
    borderRadius: 4,
  },

  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     '.test-klasa': {
    //       border: '2px solid gold',
    //       filter: 'blur(0.5px)',
    //       backgroundColor: mode === 'light' ? 'red' : 'darkred', // Logika TEST!
    //       transition: 'all 0.3s ease',
    //       '&:hover': {
    //         filter: 'blur(0px)',
    //         transform: 'scale(1.05)',
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
      },
      styleOverrides: {
        root: {
          width: '100%',
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            filter: 'blur(0px)',
            transform: 'scale(1.05)',
          },
        }
      }
    },

    // Box:{
    //   defaultPros: {
    //     p:0
    //   }
    // },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'light' ? '#fff' : '#222'
          }
        }
      }
    },

    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'light' ? '#fff' : '#222'
          }
        }
      }
    }
  }
});

const theme = createTheme(getDesignTokens('dark'));




function App() {
  // const [count, setCount] = useState(0)
  // const getWorkday = useUsers();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="ConcurSearch" replace />} />

            {/* <Route index element={<Box >{JSON.stringify({})}</Box>} /> */}
            <Route path="ConcurSearch" element={<ConcurSearch />} />
            <Route path="PowerBI" element={<>TEST2</>} />
            <Route path="ConcurLogsDashboard" element={<Box >TEST3</Box>} />

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




