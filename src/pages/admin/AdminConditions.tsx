import { useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";

export default function AdminUserConditions() {
    const [conditions, setConditions] = useState([
        { id: 1, user: "John Doe", condition: "Diabetes" },
        { id: 2, user: "Jane Smith", condition: "Hypertension" },
    ]);

    const [newCondition, setNewCondition] = useState({ user: "", condition: "" });
    const [editCondition, setEditCondition] = useState<{ id: number; user: string; condition: string } | null>(null);

    const addCondition = () => {
        if (!newCondition.user || !newCondition.condition) return;
        setConditions([
            ...conditions,
            { id: Date.now(), ...newCondition },
        ]);
        setNewCondition({ user: "", condition: "" });
    };

    const updateCondition = () => {
        if (!editCondition) return;
        setConditions(conditions.map(c => c.id === editCondition.id ? editCondition : c));
        setEditCondition(null);
    };

    const deleteCondition = (id: number) => {
        setConditions(conditions.filter(c => c.id !== id));
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">User Conditions Management</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button><Plus className="w-4 h-4 mr-2" />Add Condition</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add User Condition</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>User Name</Label>
                                        <Input
                                            placeholder="Enter user name"
                                            value={newCondition.user}
                                            onChange={(e) => setNewCondition({ ...newCondition, user: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Condition</Label>
                                        <Select
                                            value={newCondition.condition}
                                            onValueChange={(val) => setNewCondition({ ...newCondition, condition: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Diabetes">Diabetes</SelectItem>
                                                <SelectItem value="Hypertension">Hypertension</SelectItem>
                                                <SelectItem value="Asthma">Asthma</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={addCondition} className="w-full">Add</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Condition</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {conditions.map((condition) => (
                                <TableRow key={condition.id}>
                                    <TableCell>{condition.user}</TableCell>
                                    <TableCell>{condition.condition}</TableCell>
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
                                                            <Label>User Name</Label>
                                                            <Input
                                                                value={editCondition.user}
                                                                onChange={(e) => setEditCondition({ ...editCondition, user: e.target.value })}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Condition</Label>
                                                            <Select
                                                                value={editCondition.condition}
                                                                onValueChange={(val) => setEditCondition({ ...editCondition, condition: val })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select condition" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                                                                    <SelectItem value="Hypertension">Hypertension</SelectItem>
                                                                    <SelectItem value="Asthma">Asthma</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <Button onClick={updateCondition} className="w-full">Save</Button>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="ml-2 text-destructive hover:bg-destructive/10"
                                            onClick={() => deleteCondition(condition.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
