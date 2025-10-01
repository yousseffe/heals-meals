import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useRecipe } from "@/contexts/RecipeContext"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Clock, Star } from "lucide-react"

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedRecipe, selectedRecipeLoading, selectedRecipeError, getRecipe } = useRecipe()

  useEffect(() => {
    if (params.id) {
      getRecipe(params.id)
    } else {
      navigate("/search")
    }
  }, [params.id])

  if (selectedRecipeLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="w-64 h-6 mb-4" />
        <Skeleton className="w-96 h-6" />
      </div>
    )

  if (selectedRecipeError) return <div className="text-center text-red-500">{selectedRecipeError}</div>
  if (!selectedRecipe) return <div className="text-center text-gray-500">Recipe not found.</div>

  // Format prep time (convert "00:10:00" → "10 mins")
  const formatPrepTime = (time: string) => {
    if (!time) return "N/A"
    const [hours, minutes] = time.split(":")
    const mins = parseInt(minutes)
    const hrs = parseInt(hours)
    if (hrs && mins) return `${hrs} hr ${mins} min`
    if (hrs) return `${hrs} hr`
    if (mins) return `${mins} min`
    return "N/A"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={"/delicious-recipe-food-cooking.jpg"}
          alt={selectedRecipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent flex items-end">
          <div className="max-w-3xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h1 className="text-4xl font-bold mb-3 text-gray-900">{selectedRecipe.title}</h1>

              {/* Info Row: Prep time + stars */}
              <div className="flex flex-wrap items-center gap-6 mb-4 text-gray-700">
                {/* Prep Time */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="font-medium">{formatPrepTime(selectedRecipe.prepTime)}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (selectedRecipe.stars || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedRecipe.description}</p>

              <Link to="/search">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                  Discover More Recipes
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Steps Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-b pb-2">
              Cooking Steps
            </h2>
            <div className="space-y-4">
              {selectedRecipe.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white font-semibold flex items-center justify-center rounded-full">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ingredients Section */}
          <aside className="lg:col-span-1">
            <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-b pb-2">
              Ingredients
            </h2>
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {selectedRecipe.recipeIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-800 hover:text-green-700 transition-colors"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="font-medium">
                        {ingredient.ingredient_name} — {ingredient.quantity} {ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Back to Search */}
        <div className="mt-12 text-center">
          <Link to="/search">
            <Button variant="outline" className="px-8 py-2 border-gray-300 hover:bg-gray-100">
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
