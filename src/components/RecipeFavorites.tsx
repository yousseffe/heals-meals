import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
// import Link from "next/link"

const recipes = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: "Recipe Title",
  description: "A quick description about the recipe and other text.",
  image: "/delicious-food-recipe.png",
}))

export default function FavoritesPage() {
  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Bookmark className="w-12 h-12 text-green-600 fill-current" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Where all your favorites are saved</h1>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full">
              Discover More Recipes
            </Button>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                    <a href={`/recipes/${recipe.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">View Recipe</Button>
                    </a>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </div>
  )
}
