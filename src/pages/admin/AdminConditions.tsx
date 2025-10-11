import { useState, useEffect, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCondition } from "@/contexts/ConditionContext";
import { Condition } from "@/services/ConditionService";

export default function AdminConditions() {
    const { conditions, loading, error, refresh, addCondition, updateCondition, deleteCondition } =
        useCondition();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCondition, setEditingCondition] = useState<Condition | null>(null);
    const [conditionForm, setConditionForm] = useState({
        conditionName: "",
        conditionType: "DISEASE" as "DISEASE" | "ALLERGY",
    });
    const [description, setDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        refresh();
    }, []);

    const filtered = conditions.filter(
        (c) =>
            c.conditionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.conditionType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleSave() {
        if (!conditionForm.conditionName.trim()) {
            toast({
                title: "Error",
                description: "Condition name cannot be empty.",
                variant: "destructive",
            });
            return;
        }

        try {
            if (editingCondition) {
                const updated: Condition = {
                    ...editingCondition,
                    conditionName: conditionForm.conditionName.trim(),
                    conditionType: conditionForm.conditionType,
                };
                await updateCondition(updated);
                toast({ title: "Condition updated successfully" });
            } else {
                const newCondition: Condition = {
                    conditionId: crypto.randomUUID(),
                    conditionName: conditionForm.conditionName.trim(),
                    conditionType: conditionForm.conditionType,
                };
                await addCondition(newCondition);
                toast({ title: "Condition added successfully" });
            }

            setIsDialogOpen(false);
            setEditingCondition(null);
            setConditionForm({ conditionName: "", conditionType: "DISEASE" });
            setDescription("");
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to save condition",
                variant: "destructive",
            });
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteCondition(id);
            toast({ title: "Condition deleted successfully" });
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to delete condition",
                variant: "destructive",
            });
        }
    }

    function openEditDialog(condition: Condition) {
        setEditingCondition(condition);
        setConditionForm({
            conditionName: condition.conditionName,
            conditionType: condition.conditionType,
        });
        setIsDialogOpen(true);
    }

    function openAddDialog() {
        setEditingCondition(null);
        setConditionForm({ conditionName: "", conditionType: "DISEASE" });
        setDescription("");
        setIsDialogOpen(true);
    }

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Global Conditions Management</h2>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={openAddDialog}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Condition
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingCondition ? "Edit Condition" : "Add New Condition"}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div>
                                        <Label>Condition Name</Label>
                                        <Input
                                            placeholder="e.g. Asthma"
                                            value={conditionForm.conditionName}
                                            onChange={(e) =>
                                                setConditionForm({
                                                    ...conditionForm,
                                                    conditionName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Condition Type</Label>
                                        <Select
                                            value={conditionForm.conditionType}
                                            onValueChange={(value) =>
                                                setConditionForm({
                                                    ...conditionForm,
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
                                        <Label>Description</Label>
                                        <Textarea
                                            placeholder="Briefly describe the condition..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <Button onClick={handleSave} className="w-full">
                                        {editingCondition ? "Update Condition" : "Save Condition"}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Search */}
                    <div className="mb-4 flex items-center gap-2">
                        <Input
                            placeholder="Search condition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : error ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-red-500 py-6">
                                            {error}
                                        </TableCell>
                                    </TableRow>
                                ) : filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                            No conditions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((c, index) => (
                                        <TableRow key={c.conditionId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{c.conditionName}</TableCell>
                                            <TableCell>{c.conditionType}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditDialog(c)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(c.conditionId)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
