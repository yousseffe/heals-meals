import { useEffect, useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AdminRecipes() {
    const { recipes, refresh, loading, removeRecipe, getRecipe, selectedRecipe, selectedRecipeLoading } = useRecipe();
    const { user } = useAuth();
    const { toast } = useToast();

    const [deleting, setDeleting] = useState<string | null>(null);
    const [viewRecipeId, setViewRecipeId] = useState<string | null>(null);

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (viewRecipeId) {
            getRecipe(viewRecipeId);
        }
    }, [viewRecipeId]);

    const handleDelete = async (id: string) => {
        if (!user) return;
        setDeleting(id);
        try {
            await removeRecipe(id);
            toast({
                title: "Recipe deleted",
                description: "The recipe has been removed successfully.",
            });
            refresh();
        } catch {
            toast({
                variant: "destructive",
                title: "Error deleting recipe",
                description: "Please try again later.",
            });
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-muted/20">
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">All Recipes</CardTitle>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                            Loading recipes...
                        </div>
                    ) : recipes.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No recipes found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                                <thead className="bg-muted/60 text-sm text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Title</th>
                                        <th className="px-4 py-2 text-left">Description</th>
                                        <th className="px-4 py-2 text-left">Prep Time</th>
                                        <th className="px-4 py-2 text-center">Stars</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.map((recipe) => (
                                        <tr
                                            key={recipe.recipe_id}
                                            className="border-t border-border/40 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-4 py-2 font-medium">{recipe.title}</td>
                                            <td className="px-4 py-2 max-w-md truncate">
                                                {recipe.description}
                                            </td>
                                            <td className="px-4 py-2">{recipe.prepTime}</td>
                                            <td className="px-4 py-2 text-center">{recipe.stars} ⭐</td>
                                            <td className="px-4 py-2 text-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setViewRecipeId(recipe.recipe_id)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(recipe.recipe_id)}
                                                    disabled={deleting === recipe.recipe_id}
                                                >
                                                    {deleting === recipe.recipe_id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
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

            {/* View Recipe Dialog */}
            <Dialog open={!!viewRecipeId} onOpenChange={() => setViewRecipeId(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedRecipe?.title || "Recipe Details"}</DialogTitle>
                        <DialogDescription>
                            View complete recipe information including ingredients and steps.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRecipeLoading ? (
                        <div className="flex items-center justify-center py-10 text-muted-foreground">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Loading recipe details...
                        </div>
                    ) : selectedRecipe ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Description</h4>
                                <p className="text-muted-foreground">{selectedRecipe.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <p><strong>Prep Time:</strong> {selectedRecipe.prepTime}</p>
                                <p><strong>Stars:</strong> {selectedRecipe.stars} ⭐</p>
                                <p><strong>Created By:</strong> {selectedRecipe.createdBy}</p>
                                <p><strong>Date Added:</strong> {new Date(selectedRecipe.dateAdded).toLocaleDateString()}</p>
                                {selectedRecipe.dateUpdated && (
                                    <p><strong>Last Updated:</strong> {new Date(selectedRecipe.dateUpdated).toLocaleDateString()}</p>
                                )}
                            </div>

                            {selectedRecipe.recipeIngredients && selectedRecipe.recipeIngredients.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Ingredients</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        {selectedRecipe.recipeIngredients.map((ing) => (
                                            <li key={ing.recipe_ingredientId}>
                                                {ing.quantity} {ing.unit} {ing.ingredient_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedRecipe.steps && selectedRecipe.steps.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Steps</h4>
                                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                        {selectedRecipe.steps.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-6">
                            Recipe details unavailable.
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
