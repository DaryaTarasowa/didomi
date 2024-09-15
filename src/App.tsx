import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./index.css";

import Root from "./pages/Root/root.tsx";
import ErrorPage from "./pages/errorPage.tsx";
import Consent from "./pages/give-consent.tsx";
import ConsentsList from "./pages/Consents/consents.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme/theme.ts";

const queryClient = new QueryClient()

const theme = createTheme({cssVariables: true, ...themeOptions});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "give-consent",
                element: <Consent/>,
            },
            {
                path: "consents",
                element: <ConsentsList consentsPerPage={ 2 }/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <ThemeProvider theme={theme}>
                <RouterProvider router={ router }/>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
