import { Box, Paper, Tabs, Tab, TextField, Button, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { useRegister } from "../query/hooks/reigster";
import { useLogin, useSilentLogin } from "../query/hooks/login";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/auth-store";

type Action =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PWD"; payload: string }
    | { type: "SET_PWD2"; payload: string }
    | { type: "SET_USERNAME"; payload: string };

const initialState = {
    email: "",
    password: "",
    password2: "",
    username: ""
};

function reducerFunc(state: { email: string, password: string, username: string }, action: Action) {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PWD":
            return { ...state, password: action.payload };
        case "SET_PWD2":
            return { ...state, password2: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        default:
            return state;

    }
}

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        // console.log(_)
        setActiveTab(newValue);
    };
    
    const {
        data: silentLoginData,
        isSuccess: silentDataIsSuccess,
        isLoading: isSilentLoading
    } = useSilentLogin();

    useEffect(() => {
        if (silentDataIsSuccess && silentLoginData) {
            // setUser(silentLoginData); // Sačuvaj korisnika u store
            navigate("/app");
        }
    }, [silentDataIsSuccess, silentLoginData, navigate]);


    const { mutateAsync: masync } = useRegister();

    const { mutateAsync: loginAsync, isPending, data } = useLogin();




    async function handleSubmit() {
        try {
            await loginAsync({ email: state.email, password: state.password });
            navigate("/app");

        } catch (err) {
            console.log("Something went wrong:", err);
        }
    }



    const [state, dispatch] = useReducer(reducerFunc, initialState);
    const setUser = useAuthStore(s => s.setUser);
    // const user = useAuthStore(s => s.user);
    // console.log(state)
    useEffect(() => {
        if (data)
            setUser(data);
    }, [data])

    if (isSilentLoading) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Checking session...</Typography>
            </Box>
        );
    }

    if (isPending) return <Box>LOGGIN</Box>

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                px: 2,
            }}
        >
            {/* Title / Logo */}
            <Typography
                variant="h3"
                sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
            >
                TRAVEL
            </Typography>

            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "primary.main",
                }}
            >
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={(e, val) => handleChange(e, val)}
                    variant="fullWidth"
                    sx={{ mb: 2 }}
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {/* Login Form */}
                {activeTab === 0 && (
                    <Box>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            // value={state.email}
                            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            //  value={state.password}
                            onChange={(e) => dispatch({ type: "SET_PWD", payload: e.target.value })}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={async () => await handleSubmit()}
                        >
                            Login
                        </Button>
                    </Box>
                )}

                {/* Register Form */}
                {activeTab === 1 && (
                    <Box>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => dispatch({ type: "SET_USERNAME", payload: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => dispatch({ type: "SET_PWD", payload: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            type="repeat password"
                            label="Repeat password"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => dispatch({ type: "SET_PWD2", payload: e.target.value })}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={async () => {
                                try {
                                    const data = await masync({
                                        email: state.email,
                                        password: state.password,
                                        name: state.username
                                    });


                                    // console.log("Register success:", data);
                                    alert(data.message || "Registered successfully!");
                                } catch (err: any) {
                                    console.error("Register error:", err);
                                    alert(err.response?.data?.data.details || "Registration failed");
                                }
                            }}

                        >
                            Register
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Footer text */}
            <Typography
                sx={{ mt: 4, color: "text.secondary", fontSize: 13 }}
            >
                © {new Date().getFullYear()} My App. All rights reserved.
            </Typography>
        </Box>
    );
}
