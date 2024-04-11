import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import { useTheme, Card, FAB, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../App';

function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');

  const mockRecipes = [
    { id: '1', title: 'Spaghetti Carbonara', cuisine: 'Italian' },
    { id: '2', title: 'Chicken Tikka Masala', cuisine: 'Indian' },
    // Add more mock data
  ];

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
    // Intended for API call
  };

  const handleAddRecipe = () => {
    console.log('Navigate to Add Recipe Screen');
    // Intended for navigation
    // navigation.navigate('AddRecipeScreen');
  };

  const renderItem = ({ item } : any) => (
    <Card style={styles.card} onPress={() => console.log('Navigate to Recipe', item.id)}>
      <Card.Content>
        <Text style={{ color: theme.colors.onSecondaryContainer }}>{item.title}</Text>
        <Text style={{ color: theme.colors.onSecondaryContainer }}>{item.cuisine}</Text>
      </Card.Content>
    </Card>
  );

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
        placeholder="Search recipes..."
        placeholderTextColor={theme.colors.onSecondaryContainer}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={mockRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
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
