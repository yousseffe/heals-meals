import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCondition } from "@/contexts/ConditionContext";
import { Condition } from "@/services/ConditionService";

export default function AdminConditions() {
    const {
        conditions,
        loading,
        error,
        refresh,
        addCondition,
        deleteCondition,
    } = useCondition();

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCondition, setNewCondition] = useState({
        conditionName: "",
        conditionType: "DISEASE" as "DISEASE" | "ALLERGY",
    });
    const [description, setDescription] = useState("");

    const refreshData = useCallback(async () => {
        await refresh();
    }, [refresh]);

    useEffect(() => {
        refreshData();
    }, []);

    const filtered = conditions.filter(
        (c) =>
            c.conditionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.conditionType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleDelete(id: string) {
        await deleteCondition(id);
    }

    async function handleAddCondition() {
        if (!newCondition.conditionName.trim()) return;

        const condition: Condition = {
            conditionId: crypto.randomUUID(),
            conditionName: newCondition.conditionName.trim(),
            conditionType: newCondition.conditionType,
        };

        await addCondition(condition);
        setNewCondition({ conditionName: "", conditionType: "DISEASE" });
        setDescription("");
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
                                            value={newCondition.conditionName}
                                            onChange={(e) =>
                                                setNewCondition({
                                                    ...newCondition,
                                                    conditionName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Condition Type</Label>
                                        <Select
                                            value={newCondition.conditionType}
                                            onValueChange={(value) =>
                                                setNewCondition({
                                                    ...newCondition,
                                                    conditionType: value as "DISEASE" | "ALLERGY",
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DISEASE">Disease</SelectItem>
                                                <SelectItem value="ALLERGY">Allergy</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Briefly describe the condition..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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

                    {/* Loading/Error */}
                    {loading && (
                        <p className="text-gray-500 text-center py-4">
                            Loading conditions...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center py-4">Error: {error}</p>
                    )}

                    {/* Table */}
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3 border-b">#</th>
                                        <th className="p-3 border-b">Name</th>
                                        <th className="p-3 border-b">Type</th>
                                        <th className="p-3 border-b text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length > 0 ? (
                                        filtered.map((c, index) => (
                                            <tr key={c.conditionId} className="hover:bg-gray-50">
                                                <td className="p-3 border-b">{index + 1}</td>
                                                <td className="p-3 border-b font-medium">
                                                    {c.conditionName}
                                                </td>
                                                <td className="p-3 border-b">{c.conditionType}</td>
                                                <td className="p-3 border-b text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(c.conditionId)}
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
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
