import { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { useAuth } from "@/contexts/AuthContext";
import {
    UserCondition,
    getAllUserConditions,
    addCondition as apiAddCondition,
    deleteCondition as apiDeleteCondition,
} from "@/services/UserConditionService";
import { ConditionType } from "@/services/ConditionService";

export default function AdminUserConditions() {
    const { token } = useAuth();
    const [conditions, setConditions] = useState<UserCondition[]>([]);
    const [loading, setLoading] = useState(false);

    const [newCondition, setNewCondition] = useState({
        userId: "",
        conditionId: "",
    });

    const [editCondition, setEditCondition] = useState<UserCondition | null>(null);

    const fetchAllConditions = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getAllUserConditions(token);
            setConditions(data);
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to fetch user conditions",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllConditions();
    }, [token]);

    const handleAddCondition = async () => {
        if (!token) return;
        try {
            await apiAddCondition(
                { userId: newCondition.userId },
                { conditionId: newCondition.conditionId },
                token
            );
            toast({ title: "Condition added successfully" });
            await fetchAllConditions();
            setNewCondition({ userId: "", conditionId: "" });
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to add condition",
                variant: "destructive",
            });
        }
    };

    const handleDeleteCondition = async (id: string) => {
        if (!token) return;
        try {
            await apiDeleteCondition(id, token);
            toast({ title: "Condition deleted successfully" });
            setConditions((prev) => prev.filter((c) => c.id !== id));
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to delete condition",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">User Conditions Management</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Condition
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add User Condition</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>User ID</Label>
                                        <Input
                                            placeholder="Enter user ID"
                                            value={newCondition.userId}
                                            onChange={(e) =>
                                                setNewCondition({
                                                    ...newCondition,
                                                    userId: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Condition ID</Label>
                                        <Input
                                            placeholder="Enter condition ID"
                                            value={newCondition.conditionId}
                                            onChange={(e) =>
                                                setNewCondition({
                                                    ...newCondition,
                                                    conditionId: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <Button onClick={handleAddCondition} className="w-full">
                                        Add
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Condition Name</TableHead>
                                    <TableHead>Condition Type</TableHead>
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
                                ) : conditions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6">
                                            No user conditions found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    conditions.map((condition) => (
                                        <TableRow key={condition.id}>
                                            <TableCell>{condition.userId}</TableCell>
                                            <TableCell>{condition.conditionName}</TableCell>
                                            <TableCell>
                                                {condition.conditionType === "ALLERGY"
                                                    ? "Allergy"
                                                    : "Disease"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setEditCondition(condition)}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Condition</DialogTitle>
                                                        </DialogHeader>
                                                        {editCondition && (
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <Label>User ID</Label>
                                                                    <Input
                                                                        value={editCondition.userId}
                                                                        onChange={(e) =>
                                                                            setEditCondition({
                                                                                ...editCondition,
                                                                                userId: e.target.value,
                                                                            })
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label>Condition Name</Label>
                                                                    <Input
                                                                        value={editCondition.conditionName}
                                                                        onChange={(e) =>
                                                                            setEditCondition({
                                                                                ...editCondition,
                                                                                conditionName: e.target.value,
                                                                            })
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label>Condition Type</Label>
                                                                    <Select
                                                                        value={editCondition.conditionType}
                                                                        onValueChange={(val) =>
                                                                            setEditCondition({
                                                                                ...editCondition,
                                                                                conditionType: val as ConditionType,
                                                                            })
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="ALLERGY">
                                                                                Allergy
                                                                            </SelectItem>
                                                                            <SelectItem value="DISEASE">
                                                                                Disease
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <Button className="w-full">Save</Button>
                                                            </div>
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-2 text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDeleteCondition(condition.id)}
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
