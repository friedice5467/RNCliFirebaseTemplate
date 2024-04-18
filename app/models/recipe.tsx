export interface NutrientInfo {
    label: string;
    quantity: number;
    unit: string;
}

export interface Recipe {
    uri: string;
    label: string;
    image: string;
    images?: { [size: string]: { url: string; width?: number; height?: number }};
    source: string;
    url: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: { text: string; weight: number; }[];
    calories: number;
    totalWeight: number;
    totalTime: number;  
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];  
    tips: string[];  
    videoLink?: string;  
    ratings?: { average: number; count: number; };  
    reviews?: string[]; 
    pairingSuggestions?: string[];
    difficultyLevel?: string;
    storageTips?: string;  
    totalNutrients: { [key: string]: NutrientInfo };
}

