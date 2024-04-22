export interface AppUser {
    uid : string;
    email : string | null;
    displayName : string | null;

    /**
     * User's preferred meal types, e.g., breakfast, lunch, dinner, snack, etc.
     */
    mealTypes: string[];
    /**
     * User's preferred dish type or course, e.g., appetizer, main course, dessert, etc.
     */
    dishTypes: string[];
    /**
     * User's dietary preferences, e.g., vegetarian, vegan, gluten-free, etc.
     */
    dietaryPreferences: string[];

    /**
     * Favorite cuisines or types of food, which can help in tailoring recipe suggestions.
     */
    favoriteCuisines: string[];

    /**
     * Disliked cuisines or types of food, which can help in tailoring recipe suggestions.
     */
    dislikedCuisines: string[];

    /**
     * Nutritional preferences, like low-carb, high-protein, etc.
     */
    nutritionalPreferences: string[];

    /**
     * Time in minutes for the users preferred total recipe time.
     */
    preferredTotalTime: number;

    /**
     * User's cooking skill level: Beginner, Intermediate, Advanced.
     */
    cookingSkillLevel: string;

    /**
     * Any other preferences or user-specific information that could influence recipe recommendations.
     */
    additionalPreferences: string;

    /**
     * user's favorite recipes as an array of recipe uris.
     */
    favoriteRecipes: string[] | undefined;
}
