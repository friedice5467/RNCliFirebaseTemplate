import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import firestore from '../../shims/firebase-firestore-web';  
import { AppUser } from '../models/appUser';  
import auth from '@react-native-firebase/auth';

export const UserProfileSetup = ({ onProfileUpdate }: { onProfileUpdate: (user: AppUser) => void }) => {
  const theme = useTheme();
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>([]);
  const [dislikedCuisines, setDislikedCuisines] = useState<string[]>([]);
  const [nutritionalPreferences, setNutritionalPreferences] = useState<string[]>([]);
  const [prefersQuickRecipes, setPrefersQuickRecipes] = useState(false);
  const [preferredTotalTime, setPreferredTotalTime] = useState(30);
  const [cookingSkillLevel, setCookingSkillLevel] = useState('Beginner');
  const [additionalPreferences, setAdditionalPreferences] = useState<Record<string, any>>({});

  const handleSubmit = async () => {
    const authUser = auth().currentUser;
    if (authUser) {
      const userProfileRef = firestore().collection('users').doc(authUser.uid);
      const updatedProfile: AppUser = {
        ...authUser, 
        dietaryPreferences,
        foodAllergies,
        favoriteCuisines,
        dislikedCuisines,
        nutritionalPreferences,
        prefersQuickRecipes,
        preferredTotalTime,
        cookingSkillLevel,
        additionalPreferences
      };
      await userProfileRef.set(updatedProfile, { merge: true });
      onProfileUpdate(updatedProfile as AppUser);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={styles.container}>
        <TextInput label="Dietary Preferences" value={dietaryPreferences.join(', ')} onChangeText={text => setDietaryPreferences(text.split(',').map(item => item.trim()))} />
        <TextInput label="Food Allergies" value={foodAllergies.join(', ')} onChangeText={text => setFoodAllergies(text.split(',').map(item => item.trim()))} />
        <TextInput label="Favorite Cuisines" value={favoriteCuisines.join(', ')} onChangeText={text => setFavoriteCuisines(text.split(',').map(item => item.trim()))} />
        <TextInput label="Disliked Cuisines" value={dislikedCuisines.join(', ')} onChangeText={text => setDislikedCuisines(text.split(',').map(item => item.trim()))} />
        <TextInput label="Nutritional Preferences" value={nutritionalPreferences.join(', ')} onChangeText={text => setNutritionalPreferences(text.split(',').map(item => item.trim()))} />
        <TextInput label="Prefers Quick Recipes" value={prefersQuickRecipes ? "Yes" : "No"} onChangeText={text => setPrefersQuickRecipes(text.toLowerCase() === 'yes')} />
        <TextInput label="Preferred Total Time (in minutes)" value={preferredTotalTime.toString()} keyboardType="numeric" onChangeText={text => setPreferredTotalTime(parseInt(text) || 0)} />
        <TextInput label="Cooking Skill Level" value={cookingSkillLevel} onChangeText={text => setCookingSkillLevel(text)} />
        <TextInput label="Additional Preferences" value={JSON.stringify(additionalPreferences)} onChangeText={text => setAdditionalPreferences(JSON.parse(text || "{}"))} />
        <Button onPress={handleSubmit} mode="contained" style={styles.button}>Save Profile</Button>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
  },
});
