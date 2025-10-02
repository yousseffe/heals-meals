import { useEffect, useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminRecipes() {
    const { recipes, loading, error, refresh, addRecipe, removeRecipe, updateRecipe } = useRecipe();
    const { user } = useUser();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState<any>(null);
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        description: "",
        summary: "",
        prepTimeMinutes: 0,
        averageRating: 0,
        dateAdded: new Date().toISOString(),
        createdBy: user.userId,
    });

    useEffect(() => {
        refresh();
    }, []);

    const handleCreate = async () => {
        if (!user) return toast({ title: "Error", description: "You must be logged in to add a recipe." });

        try {
            await addRecipe(newRecipe, user.userId);
            toast({ title: "Recipe added successfully!" });
            setIsCreateOpen(false);
            setNewRecipe({ name: "", description: "", summary: "", prepTimeMinutes: 0, averageRating: 0, dateAdded: new Date().toISOString(), createdBy: user.userId });
            await refresh();
        } catch (err: any) {
            toast({ title: "Failed to add recipe", description: err.message, variant: "destructive" });
        }
    };

    const handleEdit = async () => {
        if (!user || !editingRecipe) return;

        try {
            await updateRecipe(editingRecipe.recipe_id, editingRecipe, user.userId);
            toast({ title: "Recipe updated successfully!" });
            setIsEditOpen(false);
            setEditingRecipe(null);
            await refresh();
        } catch (err: any) {
            toast({ title: "Failed to update recipe", description: err.message, variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await removeRecipe(id);
            toast({ title: "Recipe deleted successfully!" });
            await refresh();
        } catch (err: any) {
            toast({ title: "Failed to delete recipe", description: err.message, variant: "destructive" });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Manage Recipes</h1>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 w-4 h-4" /> Create Recipe
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Recipe</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={newRecipe.name}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Input
                                    value={newRecipe.description}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                                />
                            </div>
                            
                            <div>
                                <Label>Summary</Label>
                                <Input
                                    value={newRecipe.summary}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, summary: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label>Preparation Time</Label>
                                <Input
                                    value={newRecipe.prepTimeMinutes}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, prepTimeMinutes: Number(e.target.value) })}
                                />
                            </div>

                            <div>
                                <Label>Average Rating</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="5"
                                    value={newRecipe.averageRating}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, averageRating: Number(e.target.value) })}
                                />
                            </div>

                            <Button onClick={handleCreate}>Create</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <Loader2 className="animate-spin w-6 h-6" />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((recipe) => (
                        <Card key={recipe.recipeId} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold">{recipe.name}</h2>
                                <p className="text-sm text-gray-600">{recipe.description}</p>
                                <p className="text-sm text-gray-500">Prep Time: {recipe.prepTimeMinutes}</p>
                                <p className="text-sm text-yellow-600">⭐ {recipe.stars}</p>

                                <div className="flex justify-between items-center pt-2">
                                    <Dialog open={isEditOpen && editingRecipe?.recipe_id === recipe.recipeId} onOpenChange={(open) => {
                                        setIsEditOpen(open);
                                        if (open) setEditingRecipe(recipe);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="w-4 h-4 mr-2" /> Edit
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Recipe</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input
                                                        value={editingRecipe?.title || ""}
                                                        onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <Label>Description</Label>
                                                    <Input
                                                        value={editingRecipe?.description || ""}
                                                        onChange={(e) => setEditingRecipe({ ...editingRecipe, description: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <Label>Preparation Time</Label>
                                                    <Input
                                                        value={editingRecipe?.prepTime || ""}
                                                        onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <Label>Stars</Label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="5"
                                                        value={editingRecipe?.stars || 0}
                                                        onChange={(e) => setEditingRecipe({ ...editingRecipe, stars: Number(e.target.value) })}
                                                    />
                                                </div>

                                                <Button onClick={handleEdit}>Save Changes</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(recipe.recipeId)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
