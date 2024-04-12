import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card, Title, Paragraph } from 'react-native-paper';

// Mock recipe data for visualization
const recipe = {
  id: '1',
  title: 'Spaghetti Carbonara',
  imageUrl: 'https://via.placeholder.com/400x200', // Placeholder image URL
  ingredients: [
    '100g pancetta',
    '50g pecorino cheese',
    '50g parmesan',
    '3 large eggs',
    '350g spaghetti',
    '2 plump garlic cloves, peeled and left whole',
    '50g unsalted butter',
    'sea salt and freshly grated black pepper',
  ],
  instructions: `1. Put a large saucepan of water on to boil.\n2. Finely chop the 100g pancetta, having first removed any rind. Finely grate both cheeses and mix them together.\n3. Beat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside.\n4. Add 1 tsp salt to the boiling water, add the 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente.\n5. Squash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it.\n6. Melt 50g unsalted butter in a large frying pan, then add the pancetta and garlic.\n7. Leave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp.\n8. Remove from the heat and discard the garlic.\n9. Keep the cooking water to use later.\n10. Quickly pour in the eggs and cheese.\n11. Add a little of the cooking water to keep it saucy. Season with a little salt, if needed.\n12. Use tongs to lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn’t scramble, and everything is coated.\n13. Serve with a grating of parmesan and freshly ground black pepper.`,
};

const RecipeDetailScreen = () => {
  const theme = useTheme();
  const animation = useRef(new Animated.Value(200)).current; // Initial height
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleImageSize = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 200 : 400, // Toggle between the initial and expanded sizes
      duration: 300, // Duration of the animation
      useNativeDriver: false, // `height` cannot be animated using native driver
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={toggleImageSize}>
        <Animated.Image
          source={{ uri: recipe.imageUrl }}
          style={[styles.image, { height: animation }]} // Bind animated height here
        />
      </TouchableOpacity>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Title style={{ color: theme.colors.primary }}>{recipe.title}</Title>
          <Paragraph style={styles.sectionTitle}>Ingredients</Paragraph>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>{`\u2022 ${ingredient}`}</Text>
          ))}
          <Paragraph style={styles.sectionTitle}>Instructions</Paragraph>
          <Text style={styles.instructions}>{recipe.instructions}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', // Ensure the image takes full width
    resizeMode: 'cover', // Maintain the aspect ratio of the image
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  ingredient: {
    marginLeft: 8,
    fontSize: 16,
  },
  instructions: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RecipeDetailScreen;
