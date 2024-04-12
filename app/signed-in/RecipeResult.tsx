import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text, useTheme } from 'react-native-paper';
import ContextMenuView from 'react-native-context-menu-view'; 
import React, { useState } from 'react';
import {HomeScreenNavigationProp} from '../models/navigation';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const imageSize = width - 40; 

type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  nutritionInfo: string;
  likeProbability: number;
};

const mockRecipe: Recipe = {
  id: '1',
  title: 'Delicious Spaghetti Carbonara',
  imageUrl: 'https://via.placeholder.com/150x150', // Placeholder image
  nutritionInfo: 'Calories: 600, Protein: 20g, Fat: 35g',
  likeProbability: 95,
};

const recipeArray = Array.from({ length: 5 }).map(() => mockRecipe);

const RecipeResultScreen = () => {
  const theme = useTheme();
  const [fullDisplayTextVisible, setFullDisplayTextVisible] = useState<boolean>(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const getLikelihoodColor = (percentage: number): string => {
    if (percentage > 75) return theme.colors.primary;
    if (percentage > 50) return theme.colors.secondary;
    return theme.colors.tertiary;
  };

  const handleOnPress = (id : string) =>{
    console.log(`Recipe card pressed ${id}`);
  }

  const handleOnLongPress = () => {
    setFullDisplayTextVisible(true);
    console.log(`long pressed was handled and fullDisplay is ${fullDisplayTextVisible}`)
  }

  const onPressOut = () => {
    setFullDisplayTextVisible(false);
    console.log(`onPressIn was handled and fullDisplay is ${fullDisplayTextVisible}`)
  }

  function getNumberOfLines() {
    return fullDisplayTextVisible ? 3 : 1;
  }

  const handleContextMenuAction = (event: any) => {
    // Placeholder for handling context menu actions
    console.log(event.nativeEvent.name); 
    switch (event.nativeEvent.name) {
      case "View Details":
        console.log("View Details clicked");
        navigation.navigate('RecipeDetailScreen');
        break;
      case "Add to Favorites":
        console.log("Add to Favorites");
        break;
      case "Share":
        console.log("Share");
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {Array.from(recipeArray).map((recipe, index) => (
        <ContextMenuView
          key={index}
          actions={[
            { title: "View Details", icon: "eye"},
            { title: "Add to Favorites", systemIcon: "heart" },
            { title: "Share", systemIcon: "square.and.arrow.up" },
          ]}
          onPress={handleContextMenuAction}
          style={styles.contextMenuView}
        >
          <Card style={styles.card} onPress={() => handleOnPress(recipe.id)} onLongPress={handleOnLongPress} onPressOut={onPressOut}>
            <Card.Cover source={{ uri: recipe.imageUrl }} style={{ height: imageSize, width: imageSize, alignSelf: 'center' }} resizeMode="cover" />
            <Card.Content>
              <Title numberOfLines={getNumberOfLines()}>{recipe.title}</Title>
              <Paragraph>{recipe.nutritionInfo}</Paragraph>
              <Text style={[styles.likeProbability, { color: getLikelihoodColor(recipe.likeProbability) }]}>
                Likelihood of liking: {recipe.likeProbability}%
              </Text>
            </Card.Content>
          </Card>
        </ContextMenuView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  contextMenuView: {
    marginBottom: 20, 
  },
  likeProbability: {
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
});

export default RecipeResultScreen;
