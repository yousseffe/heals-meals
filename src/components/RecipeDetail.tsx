import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useParams } from "react-router-dom"

const recipeData = {
  name: "Recipe Name",
  description: "Some information about the meal/recipe.",
  fullDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
  image: "/delicious-recipe-food-cooking.jpg",
  ingredients: ["4 salmon fillets (6 oz each)",
    "2 tbsp olive oil",
    "1 tbsp fresh rosemary, chopped",
    "2 cloves garlic, minced",
    "1 lemon, sliced",
    "2 cups mixed vegetables",
    "Salt and pepper to taste",
    "1 tbsp balsamic vinegar"],
  steps: [
    {
      title: "Step 1",
      description: "A detailed instruction for this step with measurements and time taken.",
      image: "/cooking-step-instruction.jpg",
    },
    {
      title: "Step 2",
      description: "A detailed instruction for this step with measurements and time taken.",
      image: "/cooking-step-instruction.jpg",
    },
    {
      title: "Step 3",
      description: "A detailed instruction for this step with measurements and time taken.",
      image: "/cooking-step-instruction.jpg",
    },
    {
      title: "Step 4",
      description: "A detailed instruction for this step with measurements and time taken.",
      image: "/cooking-step-instruction.jpg",
    },
  ],
}
// { params }: { params: { id: string } }
export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={recipeData.image || "/placeholder.svg"}
            alt={recipeData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-end pr-12">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg max-w-md">
              <h1 className="text-3xl font-bold mb-4">{recipeData.name}</h1>
              <p className="text-gray-600 mb-2">{recipeData.description}</p>
              <p className="text-gray-700 text-sm mb-6">{recipeData.fullDescription}</p>
              <Link to="/search">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full">
                  Discover More Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Steps:</h2>
              <div className="space-y-6">
                {recipeData.steps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                        <div className="aspect-video md:aspect-square">
                          <img
                            src={step.image || "/placeholder.svg"}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ingredients Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="font-medium">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to Search */}
          <div className="mt-8 text-center">
            <a href="/search">
              <Button variant="outline" className="px-8 bg-transparent">
                Back to Search
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
