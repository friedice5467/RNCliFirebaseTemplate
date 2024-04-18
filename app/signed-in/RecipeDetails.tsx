import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme, Card, Title, Paragraph} from 'react-native-paper';
import {useRecipes} from '../contexts/RecipeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../models/navigation';

type RecipeDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  'RecipeDetailScreen'
>;

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({route}) => {
  const {uri} = route.params;
  const {recipes} = useRecipes();
  const recipe = recipes.find(r => r.uri === uri);

  const theme = useTheme();
  const animation = useRef(new Animated.Value(200)).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleImageSize = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 200 : 400,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (!recipe) {
    return <Text>No recipe found</Text>; 
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={toggleImageSize}>
        <Animated.Image
          source={{uri: recipe.image}} 
          style={[styles.image, {height: animation}]}
        />
      </TouchableOpacity>
      <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <Title style={{color: theme.colors.primary}}>{recipe.label}</Title> 
          <Paragraph style={styles.sectionTitle}>Ingredients</Paragraph>
          {recipe.ingredientLines.map((ingredient, index) => (
            <Text
              key={index}
              style={styles.ingredient}>{`\u2022 ${ingredient}`}</Text>
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
