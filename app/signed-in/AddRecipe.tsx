import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAlerts } from 'react-native-paper-alerts';
import { HomeScreenNavigationProp } from '../models/navigation';  

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
    navigation.navigate('RecipeResultScreen');
  };

  const handleAddIngredient = () => {
    if (!ingredients.at(-1)) {
      alert.alert('Validation', 'Please enter the current ingredient before adding a new one.');
      return;
    }
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleChangeIngredient = (index: number, text: string) => {
    setIngredients(ingredients.map((item, i) => i === index ? text : item));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>What ingredients do you have?</Text>
      </View>
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
      <Button
        icon="plus"
        disabled={ingredients.length >= 10 || !ingredients.at(-1)}
        mode="contained"
        onPress={handleAddIngredient}
        style={styles.addButton}
        contentStyle={styles.buttonContent}
        labelStyle={styles.addButtonLabel}
        buttonColor={theme.colors.onSecondaryContainer}
      >
        Add Ingredient
      </Button>
      <Button
        mode="contained"
        icon="magnify"
        onPress={handleFindRecipes}
        style={styles.findRecipesButton}
        labelStyle={styles.buttonLabel}
      >
        Find Recipes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  ingredientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  addButton: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '75%',
  },
  buttonContent: {
    height: 50,
  },
  addButtonLabel: {
    fontSize: 16,
  },
  findRecipesButton: {
    marginTop: 10,
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default AddRecipeScreen;
