import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RecipeCard from "@/components/RecipeCard.tsx"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useRecipe } from "@/contexts/RecipeContext"

export default function Home() {
    const { isLoggedIn } = useAuth();
    const { recipes } = useRecipe();

    const steps = [
        { title: "Step 1 - Create Profile", text: "Tell us about your health conditions, allergies, and preferences." },
        { title: "Step 2 - Get Your Recommendations", text: "Smart filtering instantly finds safe, delicious meals." },
        { title: "Step 3 - Save Your Favorites", text: "Keep track of the recipes you love, anytime." },
        { title: "Step 4 - Cook & Enjoy", text: "Follow clear step-by-step instructions and eat with confidence." },
    ]

    return (
        <div className="flex flex-col">

            <section className="relative h-[80vh] flex items-center justify-center text-center text-white">

                <img
                    src="/delicious-recipe-food-cooking.jpg"
                    alt="Delicious food"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />

                <div className="absolute inset-0 bg-black/50 -z-10"></div>

                <div className="bg-white bg-opacity-80 p-8 sm:px-4 rounded-lg text-black font-normal">
                    <h1 className="text-5xl font-bold mb-6">
                        Welcome to <span className="text-primary italic">HealMeals</span>
                    </h1>
                    <p className="text-lg mb-2 max-w-2xl mx-auto">
                        Healthy eating made simple, joyful, and safe. Whatever your allergies, dietary needs, or health conditions,
                        we’ve got you covered.
                    </p>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Discover delicious recipes tailored just for you, because eating well should always feel good.
                    </p>
                    <Link to="/search">
                        <Button variant="health" className="rounded-full" size="lg">
                            Explore Recipes
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-16 px-6 max-w-6xl mx-auto lg:w-[80%]">
                <h2 className="text-3xl font-semibold mb-8">Featured Recipes</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {recipes.slice(0, 3).map((recipe) => (
                        <RecipeCard
                            key={recipe.recipe_id}
                            recipe={recipe}
                            image={"/delicious-food-recipe.png"}
                        />
                    ))}
                </div>
            </section>

            {!isLoggedIn ?
                (
                    <section className="px-6 py-12 bg-muted/30 lg:w-[80%] self-center">
                        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mx-auto text-center">
                            {steps.map((step, i) => (
                                <Card key={i} className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {step.text}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                            <p className="mt-2 text-muted-foreground">Sign up now to receive personalized meal recommendations!</p>
                            <Button variant="health" size="lg" className="mt-4 rounded-full">
                                Sign Up
                            </Button>
                        </div>
                    </section>
                )
                : (
                    <section className="py-16 px-6 max-w-6xl mx-auto lg:w-[80%]">
                        <h2 className="text-3xl font-semibold mb-8">Recommended Recipes</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {recipes.slice(2, 9).map((recipe) => (
                                <RecipeCard
                                    key={recipe.recipe_id}
                                    recipe={recipe}
                                    image={"/delicious-food-recipe.png"}
                                />
                            ))}
                        </div>
                    </section>
                )}



            <section className="px-6 py-12 grid gap-8 md:grid-cols-2 sm:grid-cols-1 items-center self-center lg:w-[80%]">
                <img src="./logo.svg" alt="HealMeals Logo" className="w-48 mx-auto md:mx-0 justify-self-center " />
                <div>
                    <h2 className="text-2xl font-semibold mb-4">About HealMeals</h2>
                    <p className="text-muted-foreground mb-4">HealMeals was created with one simple goal: to make safe, delicious, and nutritious meals accessible to everyone, no matter their health or dietary needs. We understand how challenging it can be to find recipes that work with allergies, medical conditions, or lifestyle choices — so we built a platform that takes the guesswork out of eating well.</p>
                    <p className="text-muted-foreground mb-4">Our recipe recommendations are tailored to each user’s profile, filtering out harmful ingredients and highlighting meals you can truly enjoy. Whether you’re managing a condition, following a specific diet, or simply trying to make healthier choices, HealMeals is here to guide you every step of the way.</p>
                    <p className="text-muted-foreground mb-4">We believe food should be both nourishing and joyful — because when you eat well, you live better.</p>
                </div>
            </section>

            <section className="px-6 py-12 lg:w-[80%] self-center">
                <Card className="shadow-sm border border-destructive/30 bg-destructive/10">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-destructive">
                            Medical Disclaimer
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <p className="text-muted-foreground leading-relaxed">
                                Our recipe recommendations are tailored to each user’s profile,
                                filtering out harmful ingredients and highlighting meals you can
                                truly enjoy. Whether you’re managing a condition, following a
                                specific diet, or simply trying to make healthier choices, HealMeals
                                is here to guide you every step of the way.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4 italic">
                                Please note: HealMeals does not replace professional medical advice.
                                Always consult your healthcare provider for guidance specific to your
                                health.
                            </p>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <img
                                src="/disclaimer.jpg"
                                alt="Medical Disclaimer"
                                className="rounded-lg shadow-md max-w-xs"
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

        </div>
    )
}
