import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
