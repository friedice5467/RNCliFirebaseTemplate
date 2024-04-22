import React, { createContext, useState, useContext, useEffect } from 'react';
import firestore from '../../shims/firebase-firestore-web';
import { Recipe } from '../models/recipe';
import { useAlerts } from 'react-native-paper-alerts';
import { useAuthState } from './AuthContext';

const RecipeContext = createContext({
  recipes: [] as Recipe[],
  loading: true,
  fetchRecipes: () => {},
});

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const alerts = useAlerts();
    const { user } = useAuthState();
  
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const favoriteRecipes = user?.favoriteRecipes || [];
        const snapshot = await firestore().collection('recipes').get();
        const recipesArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Recipe),
        }));
        setRecipes(recipesArray);
      } catch (error : any) {
        alerts.alert('Failed to fetch recipes: ', error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchRecipes();
    }, []);
  
    return (
      <RecipeContext.Provider value={{ recipes, loading, fetchRecipes }}>
        {children}
      </RecipeContext.Provider>
    );
  });