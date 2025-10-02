import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Trash2 } from "lucide-react";

interface UserCondition {
    id: number;
    userName: string;
    conditionName: string;
}

export default function AdminUserConditions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock data for users and conditions
    const mockUsers = ["Alice Johnson", "Bob Smith", "Charlie Davis", "Diana Parker"];
    const mockConditions = ["Diabetes", "Hypertension", "Celiac Disease", "Asthma"];

    const [newEntry, setNewEntry] = useState({ userName: "", conditionName: "" });

    // Temporary mock data
    const [userConditions, setUserConditions] = useState<UserCondition[]>([
        { id: 1, userName: "Alice Johnson", conditionName: "Diabetes" },
        { id: 2, userName: "Bob Smith", conditionName: "Hypertension" },
        { id: 3, userName: "Charlie Davis", conditionName: "Lactose Intolerance" },
    ]);

    const filtered = userConditions.filter(
        (uc) =>
            uc.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uc.conditionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(id: number) {
        setUserConditions(userConditions.filter((uc) => uc.id !== id));
    }

    function handleAddCondition() {
        if (!newEntry.userName || !newEntry.conditionName) return;

        const newCondition: UserCondition = {
            id: userConditions.length + 1,
            userName: newEntry.userName,
            conditionName: newEntry.conditionName,
        };

        setUserConditions([...userConditions, newCondition]);
        setNewEntry({ userName: "", conditionName: "" });
        setIsDialogOpen(false);
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>User Conditions</CardTitle>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    <Plus className="w-4 h-4" />
                                    Add User Condition
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Assign Condition to User</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 mt-2">
                                    {/* User Dropdown */}
                                    <div>
                                        <Label htmlFor="user">User</Label>
                                        <Select
                                            value={newEntry.userName}
                                            onValueChange={(value) =>
                                                setNewEntry({ ...newEntry, userName: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockUsers.map((user) => (
                                                    <SelectItem key={user} value={user}>
                                                        {user}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Condition Dropdown */}
                                    <div>
                                        <Label htmlFor="condition">Condition</Label>
                                        <Select
                                            value={newEntry.conditionName}
                                            onValueChange={(value) =>
                                                setNewEntry({ ...newEntry, conditionName: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockConditions.map((condition) => (
                                                    <SelectItem key={condition} value={condition}>
                                                        {condition}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={handleAddCondition}
                                        >
                                            Assign
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search */}
                    <div className="mb-4 flex gap-2">
                        <Input
                            placeholder="Search by user or condition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button variant="outline" className="flex gap-2">
                            <Search className="w-4 h-4" />
                            Search
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border-b">#</th>
                                    <th className="p-3 border-b">User</th>
                                    <th className="p-3 border-b">Condition</th>
                                    <th className="p-3 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((uc, index) => (
                                        <tr key={uc.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{index + 1}</td>
                                            <td className="p-3 border-b">{uc.userName}</td>
                                            <td className="p-3 border-b">{uc.conditionName}</td>
                                            <td className="p-3 border-b text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(uc.id)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-gray-500">
                                            No user conditions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
