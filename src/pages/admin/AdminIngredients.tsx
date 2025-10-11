import { useEffect, useState } from "react";
import { useIngredient } from "@/contexts/IngredientContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Pencil, Plus } from "lucide-react";
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
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    console.log("ingdredients", ingredients);

    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(
        null
    );

    const [form, setForm] = useState({
        name: "",
        isHarmful_flag: false,
    });

    useEffect(() => {
        refresh(); // Run once on mount
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
        setOpenDialog(true);
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
        setOpenDialog(true);
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
            setOpenDialog(false);
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

    return (
        <div className="p-6 min-h-screen bg-muted/20">
            <Card className="shadow-sm border border-border/40">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Manage Ingredients</CardTitle>
                    <Button onClick={handleOpenCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Ingredient
                    </Button>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                            Loading ingredients...
                        </div>
                    ) : ingredients.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No ingredients found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                                <thead className="bg-muted/60 text-sm text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Harmful</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((ingredient) => (
                                        <tr
                                            key={ingredient.ingredient_id}
                                            className="border-t border-border/40 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-4 py-2">{ingredient.name}</td>
                                            <td className="px-4 py-2">
                                                {ingredient.isHarmful_flag ? "Yes" : "No"}
                                            </td>
                                            <td className="px-4 py-2 text-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleOpenEdit(ingredient.ingredient_id)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(ingredient.ingredient_id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Ingredient Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editMode ? "Edit Ingredient" : "Add New Ingredient"}
                        </DialogTitle>
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
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
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
