import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
import "./index.css";

import Root from "./pages/root.js";
import ErrorPage from "./error-page";
import Consent from "./pages/give-consent.tsx";
import ConsentsList from "./pages/consents.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "give-consent",
                element: <Consent />,
            },
            {
                path: "consents",
                element: <ConsentsList />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
