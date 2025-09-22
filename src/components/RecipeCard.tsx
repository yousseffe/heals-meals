import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Search, X, Clock, Users } from "lucide-react";

type RecipeCardProps = {
    id: number | string
    title: string
    description: string
    image?: string
    home?: boolean
    cookTime?: string
    servings?: string | number
}

export default function RecipeCard({ id, title, description, image, home=false, cookTime="30 min", servings="2 servings", }: RecipeCardProps) {
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

                {(cookTime || servings) && (
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-health-500">
                            {cookTime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{cookTime}</span>
                                </div>
                            )}
                            {servings && (
                                <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>{servings}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Link to={`/recipes/${id}`}>
                    {home ?
                        (
                            <Button variant="secondary" className="w-full rounded-full text-md">View Recipe</Button>
                        )
                        :
                        (
                            <Button className="w-full bg-green-600 hover:bg-green-700 rounded-full text-md">
                                View Recipe
                            </Button>
                        )
                    }

                </Link>
            </CardContent>
        </Card>
    )
}
