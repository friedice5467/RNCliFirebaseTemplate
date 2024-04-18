import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {useTheme, Card, FAB, Text, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../contexts/AuthContext';
import {HomeScreenNavigationProp} from '../models/navigation';
import firestore from '../../shims/firebase-firestore-web';
import {Recipe} from '../models/recipe';

function Home() {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const user = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const snapshot = await firestore().collection('recipes').get();
        const recipesArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Recipe),
        }));
        setRecipes(recipesArray);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
  };

  const handleAddRecipe = () => {
    console.log('Navigate to Add Recipe Screen');
    navigation.navigate('AddRecipeScreen');
  };

  const handleRecipePress = (uri: string) => {
    console.log(`navigate to recipe ${uri}`);
    navigation.navigate('RecipeDetailScreen', {uri: uri});
  };

  const renderItem = ({item}: {item: Recipe}) => (
    <Card style={styles.card} onPress={() => handleRecipePress(item.uri)}>
      <Card.Content>
        <Text style={{color: theme.colors.onSecondaryContainer}}>
          {item.label}
        </Text>
        <Text style={{color: theme.colors.onSecondaryContainer}}>
          {item.cuisineType.join(', ')}
        </Text>
      </Card.Content>
    </Card>
  );

  if (!user) {
    return null;
  }

  const renderContent = () => {
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        </View>
      );
    } else {
      return (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
          contentContainerStyle={styles.list}
        />
      );
    }
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TextInput
        style={[styles.searchBar, {backgroundColor: theme.colors.surface}]}
        placeholder="Search recipes..."
        placeholderTextColor={theme.colors.onSecondaryContainer}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {renderContent()}
      <FAB
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="plus"
        onPress={handleAddRecipe}
        label="Add Recipe"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
    padding: 20,
  },
  card: {
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
