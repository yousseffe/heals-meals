import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Clock, Heart } from "lucide-react"
import { useUser } from "@/contexts/UserContext"

type RecipeCardProps = {
    id: string
    title: string
    description: string
    image?: string
    cookTime?: string
}

export default function RecipeCard({ id, title, description, image, cookTime = "30 min" }: RecipeCardProps) {
    const { user, isFavorite, toggleFavorite } = useUser()

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
            <div className="aspect-video overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-health-800">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">{description}</p>

                <div className="flex items-center justify-between mb-4">
                    {/* Cook time */}
                    {cookTime && (
                        <div className="flex items-center gap-1 text-sm text-health-500">
                            <Clock className="h-4 w-4" />
                            <span>{cookTime}</span>
                        </div>
                    )}

                    {/* Favorite button */}
                    {user && (
                        <Button
                            variant="ghost"
                            onClick={() => toggleFavorite(id)}
                            className="flex items-center gap-1 text-sm text-health-500 hover:text-red-500 transition-colors"
                            aria-label="Add to favorites"
                        >
                            <Heart
                                className={`h-5 w-5 ${isFavorite(id) ? "fill-red-500 text-red-500" : "text-health-500"
                                    }`}
                            />
                        </Button>
                    )}

                </div>

                <Link to={`/recipes/${id}`}>

                    <Button variant="secondary" className="w-full text-md">
                        View Recipe
                    </Button>

                </Link>
            </CardContent>
        </Card>
    )
}
