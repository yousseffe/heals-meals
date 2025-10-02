import { useState, useEffect, useMemo } from "react";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getAllUsers, deleteUser } from "@/services/UserService";
import { User } from "@/services/AuthService";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditUserDialog from "@/pages/admin/EditUserDialog";

export default function AdminUsers() {
    const { token } = useAuth();
    const { toast } = useToast();

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // For edit dialog
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    // For delete confirmation
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Fetch users
    const fetchUsers = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await getAllUsers(token);
            setUsers(data || []);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load users.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    // Filtered users
    const filteredUsers = useMemo(() => {
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase()) ||
                u.phone?.includes(search)
        );
    }, [search, users]);

    // Handle Edit
    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsEditOpen(true);
    };

    // Handle Delete
    const handleDelete = (user: User) => {
        setDeletingUser(user);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!deletingUser || !token) return;
        try {
            await deleteUser(deletingUser.userId, token);
            toast({
                title: "User deleted",
                description: `${deletingUser.name} was removed.`,
            });
            await fetchUsers();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to delete user.",
                variant: "destructive",
            });
        } finally {
            setIsDeleteOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <h1 className="text-2xl font-semibold">Users</h1>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center text-muted-foreground py-10">
                    Loading users...
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    No users found.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user) => (
                        <Card key={user.userId}>
                            <CardContent className="p-5 flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">{user.name}</h2>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleDelete(user)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-sm text-muted-foreground">
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    {user.phone && (
                                        <p>
                                            <strong>Phone:</strong> {user.phone}
                                        </p>
                                    )}
                                    {user.address && (
                                        <p>
                                            <strong>Address:</strong> {user.address}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Dialog */}
            <EditUserDialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                user={editingUser}
                onUserUpdated={fetchUsers}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{deletingUser?.name}</span>? This
                        action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
