import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import {
  Button, Card, Title, Paragraph, Chip, Dialog, Portal, TextInput, useTheme
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firestore from '../../shims/firebase-firestore-web';
import { AppUser } from '../models/appUser';
import auth from '@react-native-firebase/auth';
import { useAlerts } from 'react-native-paper-alerts';

export const UserProfileSetup = ({
  onProfileUpdate,
}: {
  onProfileUpdate: (user: AppUser) => void;
}) => {
  const theme = useTheme();
  const alerts = useAlerts();
  const [items, setItems] = useState<{[key: string]: string[]}>({
    dietaryPreferences: [],
    foodAllergies: [],
    favoriteCuisines: [],
    dislikedCuisines: [],
    nutritionalPreferences: []
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = () => {
    const updatedItems = {
      ...items,
      [currentField]: [...items[currentField], newItem.trim()]
    };
    setItems(updatedItems);
    setNewItem('');
    setDialogVisible(false);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = {
      ...items,
      [currentField]: items[currentField].filter((_, idx) => idx !== index)
    };
    setItems(updatedItems);
  };

  const [preferredTotalTime, setPreferredTotalTime] = useState(30);
  const [cookingSkillLevel, setCookingSkillLevel] = useState('Beginner');
  const [additionalPreferences, setAdditionalPreferences] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true); 
    try {
      const authUser = auth().currentUser;
      if (authUser) {
        const userProfileRef = firestore().collection('users').doc(authUser.uid);
        const updatedProfile: AppUser = {
          ...authUser,
          dietaryPreferences: items.dietaryPreferences,
          foodAllergies: items.foodAllergies,
          favoriteCuisines: items.favoriteCuisines,
          dislikedCuisines: items.dislikedCuisines,
          nutritionalPreferences: items.nutritionalPreferences,
          preferredTotalTime,
          cookingSkillLevel,
          additionalPreferences
        };
        await userProfileRef.set(updatedProfile, { merge: true });
        onProfileUpdate(updatedProfile);
      }
    } catch (error: any) {
      alerts.alert('Error', `An error occurred while updating the profile: ${error.message}`);
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Time & Skill</Title>
          <Paragraph>Select how much time you usually spend cooking and your skill level.</Paragraph>
          <Picker
            enabled={!isLoading} 
            selectedValue={preferredTotalTime}
            onValueChange={setPreferredTotalTime}
            style={styles.picker}
          >
            {[10, 20, 30, 40, 50, 60].map(time => <Picker.Item label={`${time} minutes`} value={time} key={time} />)}
          </Picker>
          <Picker
            enabled={!isLoading} 
            selectedValue={cookingSkillLevel}
            onValueChange={setCookingSkillLevel}
            style={styles.picker}
          >
            {['Beginner', 'Intermediate', 'Advanced'].map(level => <Picker.Item label={level} value={level} key={level} />)}
          </Picker>
          <Title>Preferences</Title>
          <Paragraph>Add and manage your dietary and cooking preferences.</Paragraph>
          {Object.keys(items).map(key => (
            <View key={key} style={styles.section}>
              <Paragraph style={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</Paragraph>
              <FlatList
                data={items[key]}
                renderItem={({ item, index }) => (
                  <Chip
                    onClose={() => handleDeleteItem(index)}
                    style={styles.chip}
                    disabled={isLoading}  
                  >
                    {item}
                  </Chip>
                )}
                keyExtractor={(item, index) => `${key}-${index}`}
                horizontal
              />
              <Button 
                onPress={() => {
                  setCurrentField(key);
                  setDialogVisible(true);
                }} 
                disabled={isLoading}
              >
                Add {key}
              </Button>
            </View>
          ))}
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
        style={styles.button}
      >
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
