export interface AppUser {
    uid : string;
    email : string | null;
    displayName : string | null;

    /**
     * User's dietary preferences, e.g., vegetarian, vegan, gluten-free, etc.
     */
    dietaryPreferences: string[];

    /**
     * Food allergies or ingredients the user wants to avoid.
     */
    foodAllergies: string[];

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
}
