import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to={ `/give-consent.tsx` }>Give consent</Link>
                        </li>
                        <li>
                            <Link to={ `/consents.tsx` }>Collected consents</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"><Outlet/></div>
        </>
    );
}