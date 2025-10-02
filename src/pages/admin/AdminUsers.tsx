import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers, deleteUser } from "@/services/UserService";
import { User } from "@/services/AuthService";

export default function AdminUsers() {
    const { toast } = useToast();
    const { token } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    async function loadUsers() {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getAllUsers(token);
            setUsers(data);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error loading users",
                description: "Could not fetch users from the server.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, [token]);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleDelete(userId: string) {
        if (!token) return;
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            await deleteUser(userId, token);
            setUsers((prev) => prev.filter((u) => u.userId !== userId));
            toast({
                title: "User deleted",
                description: "The user has been removed successfully.",
                variant: "destructive",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Failed to delete user",
                description: "There was a problem deleting the user.",
                variant: "destructive",
            });
        }
    }

    // Optional add-user simulation — you can wire this up later if you want
    const handleAdd = () => {
        toast({
            title: "Feature coming soon",
            description: "Adding users will be available in a future update.",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button
                        onClick={handleAdd}
                        className="bg-health-primary hover:bg-green-700"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add New
                    </Button>
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No users found.</div>
            ) : (
                <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                        <Card
                            key={user.userId}
                            className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">
                                    {user.role || "USER"} — {user.gender || "N/A"}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(user.userId)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
