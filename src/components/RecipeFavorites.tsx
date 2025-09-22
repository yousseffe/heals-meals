import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import RecipeCard from "@/components/RecipeCard.tsx"

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

        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              home={false}
            />
          ))}
        </div>


      </div>
    </div>
  )
}
