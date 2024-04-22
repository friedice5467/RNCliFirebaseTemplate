import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import firestore from '../../shims/firebase-firestore-web';
import {AppUser} from '../models/appUser';
import auth from '@react-native-firebase/auth';
import {useAlerts} from 'react-native-paper-alerts';
import MultiSelect, {Item} from './MultiSelect';
import {
  diets,
  cuisineTypes,
  healthItems,
  mealTypes,
  dishTypes,
} from '../util/consts';

export const UserProfileSetup = ({
  onProfileUpdate,
}: {
  onProfileUpdate: (user: AppUser) => void;
}) => {
  const theme = useTheme();
  const alerts = useAlerts();
  const [selectedDiet, setSelectedDiet] = useState<Item[]>([]);
  const [selectedNutritionalPreferences, setSelectedNutritionalPreferences] =
    useState<Item[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<Item[]>([]);
  const [selectedDishTypes, setSelectedDishTypes] = useState<Item[]>([]);
  const [selectedFavCuisines, setFavSelectedCuisines] = useState<Item[]>([]);
  const [selectedDislikedCuisines, setSelectedDislikedCuisines] = useState<
    Item[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const [preferredTotalTime, setPreferredTotalTime] = useState(30);
  const [cookingSkillLevel, setCookingSkillLevel] = useState('Beginner');
  const [additionalPreferences, setAdditionalPreferences] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const authUser = auth().currentUser;
      if (authUser) {
        const userProfileRef = firestore()
          .collection('users')
          .doc(authUser.uid);
        const updatedProfile: AppUser = {
          displayName: authUser.displayName || '',
          email: authUser.email || '',
          uid: authUser.uid,
          mealTypes: selectedMealTypes.map(meal => meal.name),
          dishTypes: selectedDishTypes.map(dish => dish.name),
          dietaryPreferences: selectedDiet.map(diet => diet.name),
          favoriteCuisines: selectedFavCuisines.map(cuisine => cuisine.name),
          dislikedCuisines: selectedDislikedCuisines.map(
            cuisine => cuisine.name,
          ),
          nutritionalPreferences: selectedNutritionalPreferences.map(
            nutrition => nutrition.name,
          ),
          preferredTotalTime,
          cookingSkillLevel,
          additionalPreferences,
          favoriteRecipes: [],
        };
        await userProfileRef.set(updatedProfile, {merge: true});
        onProfileUpdate(updatedProfile);
      }
    } catch (error: any) {
      alerts.alert(
        'Error',
        `An error occurred while updating the profile: ${error.message}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Time & Skill</Title>
          <Paragraph>
            Select how much time you usually spend cooking and your skill level.
          </Paragraph>
          <Picker
            enabled={!isLoading}
            selectedValue={preferredTotalTime}
            onValueChange={setPreferredTotalTime}
            style={styles.picker}>
            {[10, 20, 30, 40, 50, 60].map(time => (
              <Picker.Item label={`${time} minutes`} value={time} key={time} />
            ))}
          </Picker>
          <Picker
            enabled={!isLoading}
            selectedValue={cookingSkillLevel}
            onValueChange={setCookingSkillLevel}
            style={styles.picker}>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <Picker.Item label={level} value={level} key={level} />
            ))}
          </Picker>
          <Title>Preferences</Title>
          <Paragraph>
            Add and manage your dietary and cooking preferences.
          </Paragraph>
          <View>
            <MultiSelect
              items={diets.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setSelectedDiet}
              key="diet"
              selectedItems={selectedDiet}
              selectText="Select Diet"
              searchInputPlaceholderText="Search Diet..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
            <MultiSelect
              items={mealTypes.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setSelectedMealTypes}
              key="meal"
              selectedItems={selectedMealTypes}
              selectText="Select Meal Types"
              searchInputPlaceholderText="Search Meal Types..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
            <MultiSelect
              items={dishTypes.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setSelectedDishTypes}
              key="dish"
              selectedItems={selectedDishTypes}
              selectText="Select Dish Types"
              searchInputPlaceholderText="Search Dish Types..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
            <MultiSelect
              items={healthItems.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setSelectedNutritionalPreferences}
              key="health"
              selectedItems={selectedNutritionalPreferences}
              selectText="Select Nutritional Preferences"
              searchInputPlaceholderText="Search Nutritional Preferences..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
            <MultiSelect
              items={cuisineTypes.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setFavSelectedCuisines}
              key="favCuisine"
              selectedItems={selectedFavCuisines}
              selectText="Select Cuisines"
              searchInputPlaceholderText="Search Cuisines..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
            <MultiSelect
              items={cuisineTypes.map((name, index) => ({
                id: index,
                name: name,
              }))}
              onSelectionChange={setSelectedDislikedCuisines}
              key="disCuisine"
              selectedItems={selectedDislikedCuisines}
              selectText="Select Disliked Cuisines"
              searchInputPlaceholderText="Search Disliked Cuisines..."
              tagRemoveIconColor={theme.colors.primary}
              tagBorderColor={theme.colors.primary}
              tagTextColor="white"
              selectedItemTextColor={theme.colors.primary}
              selectedItemIconColor={theme.colors.primary}
              itemTextColor="#000"
              displayKey="name"
              containerColor={theme.colors.backdrop}
              submitButtonColor={theme.colors.primary}
              submitButtonText="Submit"
            />
          </View>

          <TextInput
            label="Additional Preferences"
            value={additionalPreferences}
            onChangeText={setAdditionalPreferences}
            disabled={isLoading}
            style={styles.input}
          />
        </Card.Content>
      </Card>
      <Button
        onPress={handleSubmit}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}>
        Save Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 25,
    marginHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  chip: {
    marginRight: 4,
  },
  input: {
    marginBottom: 10,
  },
});
