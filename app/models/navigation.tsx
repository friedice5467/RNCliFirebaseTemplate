import {CompositeNavigationProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type HomeStackParamList = {
    HomeScreen: undefined;
    AddRecipeScreen: undefined;
    RecipeResultScreen: undefined;
    RecipeDetailScreen: undefined;
  };
  
 export type BottomTabParamList = {
    Home: undefined;
    User: undefined;
  };

 export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  StackNavigationProp<HomeStackParamList, 'HomeScreen'>
>;