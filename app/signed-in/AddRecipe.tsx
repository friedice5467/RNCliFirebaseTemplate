import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import {HomeScreenNavigationProp} from '../models/navigation';
import { useNavigation } from '@react-navigation/native';
import { useAlerts } from 'react-native-paper-alerts';

const AddRecipeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const alert = useAlerts();
  const [ingredients, setIngredients] = useState<string[]>(['']);

  const handleFindRecipes = () => {
    const validIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    
    if (validIngredients.length === 0) {
      alert.alert('Validation', 'Please enter at least one ingredient before searching for recipes.');
      return;
    }

    console.log('Finding recipes with ingredients:', validIngredients);
    // Placeholder for API call to find recipes based on validIngredients
    navigation.navigate('RecipeResultScreen');
  };

  const handleAddIngredient = () => {
    setIngredients(prevIngredients => [...prevIngredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
  };

  const handleChangeIngredient = (index: number, text: string) => {
    setIngredients(prevIngredients => prevIngredients.map((item, i) => i === index ? text : item));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>What ingredients do you have?</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientInputContainer}>
          <TextInput
            label={`Ingredient ${index + 1}`}
            value={ingredient}
            onChangeText={(text) => handleChangeIngredient(index, text)}
            mode="outlined"
            style={styles.input}
            placeholder="Enter an ingredient"
            right={ingredients.length > 1 ? <TextInput.Icon icon="close" onPress={() => handleRemoveIngredient(index)} /> : null}
          />
        </View>
      ))}
      {ingredients.length < 10 && (
        <Button
          icon="plus"
          mode="text"
          onPress={handleAddIngredient}
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}
          buttonColor={theme.colors.error}
        >
          Add ingredient
        </Button>
      )}
      <Button
        mode="contained"
        onPress={handleFindRecipes}
        style={styles.findRecipesButton}
        labelStyle={styles.buttonLabel}
        theme={{ colors: { primary: theme.colors.primary } }}
      >
        Find Recipes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  ingredientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  addButtonLabel: {
    fontSize: 16,
  },
  findRecipesButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default AddRecipeScreen;
