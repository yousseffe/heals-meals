import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Trash2 } from "lucide-react";

interface Condition {
    id: number;
    name: string;
    description: string;
}

export default function AdminConditions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCondition, setNewCondition] = useState({ name: "", description: "" });

    // Temporary mock data
    const [conditions, setConditions] = useState<Condition[]>([
        { id: 1, name: "Diabetes", description: "A chronic condition affecting blood sugar regulation." },
        { id: 2, name: "Hypertension", description: "High blood pressure affecting cardiovascular health." },
        { id: 3, name: "Celiac Disease", description: "An immune reaction to gluten that damages the small intestine." },
    ]);

    const filtered = conditions.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(id: number) {
        setConditions(conditions.filter((c) => c.id !== id));
    }

    function handleAddCondition() {
        if (!newCondition.name.trim()) return;
        const newEntry: Condition = {
            id: conditions.length + 1,
            name: newCondition.name,
            description: newCondition.description,
        };
        setConditions([...conditions, newEntry]);
        setNewCondition({ name: "", description: "" });
        setIsDialogOpen(false);
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Global Conditions</CardTitle>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    <Plus className="w-4 h-4" />
                                    Add Condition
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add a New Condition</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 mt-2">
                                    <div>
                                        <Label htmlFor="name">Condition Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Asthma"
                                            value={newCondition.name}
                                            onChange={(e) =>
                                                setNewCondition({ ...newCondition, name: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Briefly describe the condition..."
                                            value={newCondition.description}
                                            onChange={(e) =>
                                                setNewCondition({ ...newCondition, description: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={handleAddCondition}
                                        >
                                            Save Condition
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
                            placeholder="Search condition..."
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
                                    <th className="p-3 border-b">Name</th>
                                    <th className="p-3 border-b">Description</th>
                                    <th className="p-3 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((c, index) => (
                                        <tr key={c.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{index + 1}</td>
                                            <td className="p-3 border-b font-medium">{c.name}</td>
                                            <td className="p-3 border-b">{c.description}</td>
                                            <td className="p-3 border-b text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(c.id)}
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
                                            No conditions found.
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