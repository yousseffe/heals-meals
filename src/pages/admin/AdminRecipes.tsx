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

interface Recipe {
    id: number;
    name: string;
    category: string;
    calories: number;
}

export default function AdminRecipes() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [calories, setCalories] = useState<number | "">("");

    const [recipes, setRecipes] = useState<Recipe[]>([
        { id: 1, name: "Grilled Chicken Salad", category: "Lunch", calories: 320 },
        { id: 2, name: "Overnight Oats", category: "Breakfast", calories: 250 },
        { id: 3, name: "Baked Salmon", category: "Dinner", calories: 400 },
    ]);

    const filtered = recipes.filter(
        (r) =>
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleAddRecipe() {
        if (!recipeName.trim() || !recipeCategory.trim() || !calories) return;
        const newRecipe = {
            id: recipes.length + 1,
            name: recipeName.trim(),
            category: recipeCategory.trim(),
            calories: Number(calories),
        };
        setRecipes([...recipes, newRecipe]);
        setRecipeName("");
        setRecipeCategory("");
        setCalories("");
        setOpenDialog(false);
    }

    function handleDelete(id: number) {
        setRecipes(recipes.filter((r) => r.id !== id));
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Recipes</CardTitle>

                        {/* Add Recipe Dialog */}
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    <Plus className="w-4 h-4" />
                                    Add Recipe
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Recipe</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4 mt-2">
                                    <div>
                                        <Label htmlFor="recipeName">Recipe Name</Label>
                                        <Input
                                            id="recipeName"
                                            value={recipeName}
                                            onChange={(e) => setRecipeName(e.target.value)}
                                            placeholder="Enter recipe name"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="recipeCategory">Category</Label>
                                        <Input
                                            id="recipeCategory"
                                            value={recipeCategory}
                                            onChange={(e) => setRecipeCategory(e.target.value)}
                                            placeholder="Enter category (e.g., Breakfast, Lunch)"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="calories">Calories</Label>
                                        <Input
                                            id="calories"
                                            type="number"
                                            value={calories}
                                            onChange={(e) =>
                                                setCalories(e.target.value ? Number(e.target.value) : "")
                                            }
                                            placeholder="Enter total calories"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAddRecipe}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Add Recipe
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
                            placeholder="Search by recipe or category..."
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
                                    <th className="p-3 border-b">Calories</th>
                                    <th className="p-3 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((recipe, index) => (
                                        <tr key={recipe.id} className="hover:bg-gray-50">
                                            <td className="p-3 border-b">{index + 1}</td>
                                            <td className="p-3 border-b">{recipe.name}</td>
                                            <td className="p-3 border-b">{recipe.category}</td>
                                            <td className="p-3 border-b">{recipe.calories}</td>
                                            <td className="p-3 border-b text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(recipe.id)}
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
                                        <td colSpan={5} className="p-4 text-center text-gray-500">
                                            No recipes found.
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
