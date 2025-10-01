import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Clock, Heart } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { RecipeSummary } from "@/services/RecipeService"

// 
export default function RecipeCard({recipe ,image=""}: { recipe: RecipeSummary, image?: string } ) {
    const { user, isFavorite, toggleFavorite } = useUser()
    const imagePath = image ? image : "/placeholder.svg";
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
            <div className="aspect-video overflow-hidden">
                <img
                    src={imagePath}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-health-800">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

                <div className="flex items-center justify-between mb-4">
                    {/* Cook time */}
                    {recipe.prepTime && (
                        <div className="flex items-center gap-1 text-sm text-health-500">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.prepTime}</span>
                        </div>
                    )}

                    {/* Favorite button */}
                    {user && (
                        <Button
                            variant="ghost"
                            onClick={() => toggleFavorite(recipe.recipe_id)}
                            className="flex items-center gap-1 text-sm text-health-500 hover:text-red-500 transition-colors"
                            aria-label="Add to favorites"
                        >
                            <Heart
                                className={`h-5 w-5 ${isFavorite(recipe.recipe_id) ? "fill-red-500 text-red-500" : "text-health-500"
                                    }`}
                            />
                        </Button>
                    )}

                </div>

                <Link to={`/recipes/${recipe.recipe_id}`}>

                    <Button variant="secondary" className="w-full text-md">
                        View Recipe
                    </Button>

                </Link>
            </CardContent>
        </Card>
    )
}
