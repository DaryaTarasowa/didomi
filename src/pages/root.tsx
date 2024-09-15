import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to={ `/give-consent` }>Give consent</Link>
                        </li>
                        <li>
                            <Link to={ `/consents` }>Collected consents</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"><Outlet/></div>
        </>
    );
}