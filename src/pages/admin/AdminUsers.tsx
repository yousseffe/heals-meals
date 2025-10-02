import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulated API data (replace with your real service)
type User = {
    id: string;
    name: string;
    email: string;
};

export default function AdminUsers() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Simulate fetch from API
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setUsers([
                { id: "1", name: "Alice Johnson", email: "alice@example.com" },
                { id: "2", name: "Bob Smith", email: "bob@example.com" },
                { id: "3", name: "Charlie Brown", email: "charlie@example.com" },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter users
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Simulate delete
    const handleDelete = (id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast({
            title: "User deleted",
            description: `User with ID ${id} has been removed.`,
            variant: "destructive",
        });
    };

    // Simulate add new
    const handleAdd = () => {
        const newUser: User = {
            id: Date.now().toString(),
            name: `New User ${users.length + 1}`,
            email: `newuser${users.length + 1}@example.com`,
        };
        setUsers((prev) => [...prev, newUser]);
        toast({
            title: "User added",
            description: `${newUser.name} was successfully created.`,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button onClick={handleAdd} className="bg-health-primary hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-1" /> Add New
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-16 bg-gray-200 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No users found.
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                        <Card
                            key={user.id}
                            className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(user.id)}
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
