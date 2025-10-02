import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import RecipeCard from "@/components/RecipeCard.tsx";
import { useRecipe } from "@/contexts/RecipeContext";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Import your skeleton UI
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const { favorites } = useRecipe();
  const [loading, setLoading] = useState(true); // 🟡 local loading simulation

  useEffect(() => {
    // Simulate loading for 2 seconds (adjust to test animation)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Bookmark className="w-12 h-12 text-green-600 fill-current" />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            Where all your favorites are saved
          </h1>
          <Link to="/search">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full">
              Discover More Recipes
            </Button>
          </Link>
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                  <Skeleton className="w-full h-40 rounded-lg mb-4" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-1/2 h-5 mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="w-16 h-6 rounded-full" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((favourite) => (
              <RecipeCard
                key={favourite.favouriteId}
                recipe={favourite.recipe}
                image={"/delicious-food-recipe.png"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            You don’t have any favorites yet. Try adding some!
          </div>
        )}
      </div>
    </div>
  );
}
