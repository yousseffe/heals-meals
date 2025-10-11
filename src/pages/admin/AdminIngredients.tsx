import { useEffect, useState, useCallback } from "react";
import { useIngredient } from "@/contexts/IngredientContext";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Loader2,
    Trash2,
    Pencil,
    Plus,
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminIngredients() {
    const {
        ingredients,
        loading,
        refresh,
        addIngredient,
        updateIngredient,
        deleteIngredient,
    } = useIngredient();
    const { toast } = useToast();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [form, setForm] = useState({
        name: "",
        isHarmful_flag: false,
    });

    useEffect(() => {
        refresh();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleHarmfulChange = (value: string) => {
        setForm((prev) => ({ ...prev, isHarmful_flag: value === "true" }));
    };

    const handleOpenCreate = () => {
        setForm({ name: "", isHarmful_flag: false });
        setEditMode(false);
        setSelectedIngredientId(null);
        setDialogOpen(true);
    };

    const handleOpenEdit = (ingredientId: string) => {
        const ingredient = ingredients.find((i) => i.ingredient_id === ingredientId);
        if (!ingredient) return;
        setForm({
            name: ingredient.name,
            isHarmful_flag: ingredient.isHarmful_flag,
        });
        setSelectedIngredientId(ingredientId);
        setEditMode(true);
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (editMode && selectedIngredientId) {
                await updateIngredient(selectedIngredientId, {
                    ingredient_id: selectedIngredientId,
                    ...form,
                });
                toast({ title: "Ingredient updated successfully" });
            } else {
                await addIngredient({
                    ingredient_id: "",
                    ...form,
                });
                toast({ title: "Ingredient added successfully" });
            }
            setDialogOpen(false);
            refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Error saving ingredient",
                description: "Please try again later.",
            });
        }
    };

    const handleDelete = async (ingredientId: string) => {
        try {
            await deleteIngredient(ingredientId);
            toast({ title: "Ingredient deleted successfully" });
            refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Error deleting ingredient",
            });
        }
    };

    const filteredIngredients = ingredients.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 min-h-screen bg-muted/20">
            <Card className="shadow-sm border border-border/40">
                <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CardTitle className="text-2xl font-bold">Manage Ingredients</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search ingredient..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Button onClick={handleOpenCreate}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Ingredient
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                            Loading ingredients...
                        </div>
                    ) : filteredIngredients.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No ingredients found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Harmful</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredIngredients.map((ingredient, index) => (
                                        <TableRow key={ingredient.ingredient_id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">{ingredient.name}</TableCell>
                                            <TableCell>
                                                {ingredient.isHarmful_flag ? (
                                                    <span className="text-red-600 font-semibold">Yes</span>
                                                ) : (
                                                    <span className="text-green-600 font-semibold">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenEdit(ingredient.ingredient_id)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(ingredient.ingredient_id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Ingredient Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editMode ? "Edit Ingredient" : "Add New Ingredient"}</DialogTitle>
                        <DialogDescription>
                            {editMode
                                ? "Update the ingredient details below."
                                : "Fill out the form to add a new ingredient."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="Enter ingredient name"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Is Harmful?</label>
                            <Select
                                value={form.isHarmful_flag ? "true" : "false"}
                                onValueChange={handleHarmfulChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select harmful flag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="false">No</SelectItem>
                                    <SelectItem value="true">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {editMode ? "Save Changes" : "Add Ingredient"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
