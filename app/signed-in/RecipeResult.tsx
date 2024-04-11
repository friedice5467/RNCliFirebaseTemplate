import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text, useTheme } from 'react-native-paper';
import ContextMenuView from 'react-native-context-menu-view'; 

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

const RecipeResultScreen = () => {
  const theme = useTheme();

  const getLikelihoodColor = (percentage: number): string => {
    if (percentage > 75) return theme.colors.primary;
    if (percentage > 50) return theme.colors.secondary;
    return theme.colors.tertiary;
  };

  const handleContextMenuAction = (event: any) => {
    // Placeholder for handling context menu actions
    console.log(event.nativeEvent.action); // Log the action for demonstration
  };

  return (
    <ScrollView style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ContextMenuView
          key={index}
          actions={[
            { title: "View Details", systemIcon: "eye" },
            { title: "Add to Favorites", systemIcon: "heart" },
            { title: "Share", systemIcon: "square.and.arrow.up" },
          ]}
          onPress={handleContextMenuAction}
          style={styles.contextMenuView}
        >
          <Card style={styles.card}>
            <Card.Cover source={{ uri: mockRecipe.imageUrl }} style={{ height: imageSize, alignSelf: 'center' }} resizeMode="cover" />
            <Card.Content>
              <Title>{mockRecipe.title}</Title>
              <Paragraph>{mockRecipe.nutritionInfo}</Paragraph>
              <Text style={[styles.likeProbability, { color: getLikelihoodColor(mockRecipe.likeProbability) }]}>
                Likelihood of liking: {mockRecipe.likeProbability}%
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
