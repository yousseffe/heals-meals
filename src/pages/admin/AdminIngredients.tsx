import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Ingredient {
    id: number;
    name: string;
    category: string;
}

export default function AdminIngredients() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientCategory, setIngredientCategory] = useState("");

    // Mock data
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { id: 1, name: "Tomato", category: "Vegetable" },
        { id: 2, name: "Olive Oil", category: "Fat" },
        { id: 3, name: "Chicken Breast", category: "Protein" },
    ]);

    const filtered = ingredients.filter(
        (i) =>
            i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleAddIngredient() {
        if (!ingredientName.trim() || !ingredientCategory.trim()) return;
        const newIngredient = {
            id: ingredients.length + 1,
            name: ingredientName.trim(),
            category: ingredientCategory.trim(),
        };
        setIngredients([...ingredients, newIngredient]);
        setIngredientName("");
        setIngredientCategory("");
        setOpenDialog(false);
    }

    function handleDelete(id: number) {
        setIngredients(ingredients.filter((i) => i.id !== id));
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Ingredients</CardTitle>

                        {/* Add Ingredient Dialog */}
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    <Plus className="w-4 h-4" />
                                    Add Ingredient
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Ingredient</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 mt-2">
                                    <div>
                                        <Label htmlFor="ingredientName">Ingredient Name</Label>
                                        <Input
                                            id="ingredientName"
                                            value={ingredientName}
                                            onChange={(e) => setIngredientName(e.target.value)}
                                            placeholder="Enter ingredient name"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="ingredientCategory">Category</Label>
                                        <Input
                                            id="ingredientCategory"
                                            value={ingredientCategory}
                                            onChange={(e) => setIngredientCategory(e.target.value)}
                                            placeholder="Enter category"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAddIngredient}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Add Ingredient
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Search bar */}
                    <div className="mb-4 flex gap-2">
                        <Input
                            placeholder="Search by ingredient or category..."
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
                                    <th className="p-3 border-b">Category</th>
                                    <th className="p-3 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((ingredient, index) => (
                                        <tr key={ingredient.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{index + 1}</td>
                                            <td className="p-3 border-b">{ingredient.name}</td>
                                            <td className="p-3 border-b">{ingredient.category}</td>
                                            <td className="p-3 border-b text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(ingredient.id)}
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
                                            No ingredients found.
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
