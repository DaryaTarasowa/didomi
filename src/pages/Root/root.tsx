import React from "react";
import {NavLink, Outlet } from "react-router-dom";

import "./root.css"
import { Drawer } from "@mui/material";

export default function Root() {
    return (
        <div id="appRoot">
            <Drawer
                variant="permanent"
                anchor="left"
                aria-label="main navigation"
                id="sidebar"
                color="secondary"
            >
                <nav>
                    <NavLink
                        color="primary"
                        to={ `/give-consent` }
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Give consent
                    </NavLink>
                    <NavLink
                        color="primary"
                        to={ `/consents` }
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Collected consents
                    </NavLink>
                </nav>

            </Drawer>

            <main id="content"><Outlet/></main>
        </div>
    );
}