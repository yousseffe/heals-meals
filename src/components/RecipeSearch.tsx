import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecipeSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    duration: [],
    allergies: [],
    diseases: [],
    sortBy: "relevance"
  });

  const filterOptions = {
    type: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
    duration: ["Under 10 minutes", "10 - 20 minutes", "Over 30 minutes"],
    allergies: ["Milk", "Eggs", "Fish", "Crustacean shellfish", "Tree nuts", "Peanuts", "Wheat", "Soybeans", "Sesame"],
    diseases: ["Diabetes", "Heart Failure", "Arthritis", "Obesity", "Cancer", "COPD", "Stroke"],
    sortBy: ["Relevance", "Rating", "Time"]
  };

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Salmon Bowl",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "25 min",
      servings: "4"
    },
    {
      id: 2,
      title: "Quinoa Power Salad",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "15 min",
      servings: "2"
    },
    {
      id: 3,
      title: "Herb Crusted Chicken",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "35 min",
      servings: "6"
    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "20 min",
      servings: "3"
    },
    {
      id: 5,
      title: "Lemon Garlic Shrimp",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "18 min",
      servings: "4"
    },
    {
      id: 6,
      title: "Turkey Meatballs",
      description: "A quick description about the recipe and other text.",
      image: "/placeholder.svg",
      cookTime: "30 min",
      servings: "5"
    }
  ];

  const handleFilterToggle = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-50 to-health-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-lg border-health-200 focus:border-health-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-health-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-health-400 hover:text-health-600"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-health-800 mb-6">Filters</h2>
                
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="mb-6">
                    <h3 className="font-medium text-health-700 mb-3 capitalize">
                      {category === 'sortBy' ? 'Sort By' : category}
                    </h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type={category === 'sortBy' ? 'radio' : 'checkbox'}
                            name={category === 'sortBy' ? 'sortBy' : undefined}
                            checked={
                              category === 'sortBy' 
                                ? selectedFilters.sortBy === option.toLowerCase()
                                : selectedFilters[category].includes(option)
                            }
                            onChange={() => 
                              category === 'sortBy'
                                ? setSelectedFilters(prev => ({ ...prev, sortBy: option.toLowerCase() }))
                                : handleFilterToggle(category, option)
                            }
                            className="rounded border-health-300 text-health-600 focus:ring-health-500"
                          />
                          <span className="text-sm text-health-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-health-800 mb-2">Results</h2>
              <p className="text-health-600">Found {recipes.length} recipes</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <Card 
                  key={recipe.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div>
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-health-800 mb-2">
                        {recipe.title}
                      </h3>
                      <p className="text-health-600 text-sm mb-4">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-health-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{recipe.servings}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-health-600 hover:bg-health-700 text-white"
                        onClick={() => navigate(`/recipes/${recipe.id}`)}
                      >
                        View Recipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;