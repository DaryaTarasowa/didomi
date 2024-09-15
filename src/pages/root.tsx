import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <section id="sidebar">
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
            </section>
            <section id="content"><Outlet/></section>
        </>
    );
}