import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="pt-20 flex flex-1 min-h-[80vh]">
                <aside className="w-1/5 min-w-[240px] bg-white border-r border-gray-200 shadow-sm">
                    <AdminSidebar />
                </aside>

                <section className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
