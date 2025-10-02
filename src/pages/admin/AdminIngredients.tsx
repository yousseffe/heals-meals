import { useEffect, useMemo, useState } from "react";
import { useRecipe } from "@/contexts/RecipeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function AdminIngredients() {
    const { recipes, loading, refresh, selectedRecipe, getRecipe } = useRecipe();
    const { toast } = useToast();
    const [viewRecipeId, setViewRecipeId] = useState<string | null>(null);

    useEffect(() => {
        refresh();
    }, []);

    // Flatten all recipe ingredients
    const allIngredients = useMemo(() => {
        return recipes.flatMap((recipe) =>
            (recipe as any).recipeIngredients
                ? (recipe as any).recipeIngredients.map((ri: any) => ({
                    ...ri,
                    recipeTitle: recipe.title,
                }))
                : []
        );
    }, [recipes]);

    const handleViewRecipe = async (recipeId: string) => {
        setViewRecipeId(recipeId);
        try {
            await getRecipe(recipeId);
        } catch {
            toast({
                variant: "destructive",
                title: "Error loading recipe details",
                description: "Please try again later.",
            });
        }
    };

    const handleDelete = (ingredientId: string) => {
        toast({
            variant: "destructive",
            title: "Not implemented",
            description:
                "Deleting ingredients is not supported yet. This would require backend updates.",
        });
    };

    return (
        <div className="p-6 min-h-screen bg-muted/20">
            <Card className="shadow-sm border border-border/40">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">All Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                            Loading ingredients...
                        </div>
                    ) : allIngredients.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No ingredients found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                                <thead className="bg-muted/60 text-sm text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Recipe</th>
                                        <th className="px-4 py-2 text-left">Ingredient</th>
                                        <th className="px-4 py-2 text-left">Quantity</th>
                                        <th className="px-4 py-2 text-left">Unit</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allIngredients.map((ingredient) => (
                                        <tr
                                            key={ingredient.recipe_ingredientId}
                                            className="border-t border-border/40 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-4 py-2">{ingredient.recipeTitle}</td>
                                            <td className="px-4 py-2">{ingredient.ingredient_name}</td>
                                            <td className="px-4 py-2">{ingredient.quantity}</td>
                                            <td className="px-4 py-2">{ingredient.unit}</td>
                                            <td className="px-4 py-2 text-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleViewRecipe(ingredient.recipe_id)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDelete(ingredient.recipe_ingredientId)
                                                    }
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

            {/* View Recipe Details Dialog */}
            <Dialog
                open={!!viewRecipeId}
                onOpenChange={() => setViewRecipeId(null)}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedRecipe
                                ? `Recipe: ${selectedRecipe.name}`
                                : "Loading recipe..."}
                        </DialogTitle>
                        <DialogDescription>
                            Detailed information about the recipe.
                        </DialogDescription>
                    </DialogHeader>

                    {!selectedRecipe ? (
                        <div className="flex items-center justify-center py-8 text-muted-foreground">
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Fetching recipe details...
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p>
                                <strong>Description:</strong> {selectedRecipe.description}
                            </p>
                            <p>
                                <strong>Prep Time:</strong> {selectedRecipe.prepTime}
                            </p>
                            <p>
                                <strong>Rating:</strong> {selectedRecipe.stars} ★
                            </p>
                            {selectedRecipe.recipeIngredients?.length > 0 && (
                                <div>
                                    <p className="font-semibold text-sm mb-2">
                                        Ingredients ({selectedRecipe.recipeIngredients.length})
                                    </p>
                                    <ul className="pl-5 list-disc text-sm">
                                        {selectedRecipe.recipeIngredients.map((ing) => (
                                            <li key={ing.recipeIngredientId}>
                                                {ing.ingredient_name} — {ing.quantity} {ing.unit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
