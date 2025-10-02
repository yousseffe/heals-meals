import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Clock, Heart } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { useRecipe } from "@/contexts/RecipeContext"
import { RecipeSummary } from "@/services/RecipeService"

export default function RecipeCard({ recipe, image = "" }: { recipe: RecipeSummary, image?: string }) {
    const { user } = useUser();
    const { isFavorite, toggleFavorite } = useRecipe();
    const imagePath = image ? image : "/placeholder.svg";

    const formatPrepTime = (time: number) => {
        if (!time || time < 0) return "N/A";
        const hrs = Math.floor(time / 60);
        const mins = time % 60;
        if (hrs && mins) return `${hrs} hr ${mins} min`;
        if (hrs) return `${hrs} hr`;
        if (mins) return `${mins} min`;
        return "N/A";
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl h-full flex flex-col">
            <div className="aspect-video overflow-hidden">
                <img
                    src={imagePath}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4 flex flex-col flex-1 justify-between">
                <h3 className="font-semibold text-lg mb-2 text-health-800">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

                <div className="flex items-center justify-between mb-4">
                    {/* Cook time */}
                    {recipe.prepTimeMinutes && (
                        <div className="flex items-center gap-1 text-sm text-health-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatPrepTime(recipe.prepTimeMinutes)}</span>
                        </div>
                    )}

                    {/* Favorite button */}
                    {user && (
                        <Button
                            variant="ghost"
                            onClick={() => toggleFavorite(recipe.recipeId)}
                            className="flex items-center gap-1 text-sm text-health-500 hover:text-red-500 transition-colors"
                            aria-label="Add to favorites"
                        >
                            <Heart
                                className={`h-5 w-5 ${isFavorite(recipe.recipeId) ? "fill-red-500 text-red-500" : "text-health-500"
                                    }`}
                            />
                        </Button>
                    )}

                </div>

                <Link to={`/recipes/${recipe.recipeId}`}>

                    <Button variant="secondary" className="w-full text-md">
                        View Recipe
                    </Button>

                </Link>
            </CardContent>
        </Card>
    )
}
