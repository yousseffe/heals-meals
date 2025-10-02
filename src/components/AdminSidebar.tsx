import { NavLink } from "react-router-dom";
import { Users, HeartPulse, ListChecks, Utensils, Gift } from "lucide-react";

const navItems = [
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Conditions", path: "/admin/conditions", icon: HeartPulse },
    { name: "User Conditions", path: "/admin/user-conditions", icon: ListChecks },
    { name: "Ingredients", path: "/admin/ingredients", icon: Utensils },
    { name: "Recipes", path: "/admin/recipes", icon: ListChecks },
    { name: "Donations", path: "/admin/donations", icon: Gift },
];

export default function AdminSidebar() {
    return (
        <nav className="flex flex-col h-full p-4 space-y-2">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Admin Panel</h2>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all ${isActive ? "bg-gray-200 font-semibold" : ""
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {item.name}
                    </NavLink>
                );
            })}
        </nav>
    );
}
