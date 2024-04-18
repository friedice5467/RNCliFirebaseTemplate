import {CompositeNavigationProp} from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
  AddRecipeScreen: undefined;
  RecipeResultScreen: undefined;
  RecipeDetailScreen: { uri?: string };
};
// Define the type for the route prop specific to RecipeDetailScreen
export type RecipeDetailScreenRouteProp = RouteProp<HomeStackParamList, 'RecipeDetailScreen'>;

// Optional: Define the navigation prop if you need to use navigation functions
export type RecipeDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'RecipeDetailScreen'>;
export type ProfileStackParamList = {
  UserProfile: undefined;
  UserSettings: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  User: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  StackNavigationProp<HomeStackParamList>
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'User'>,
  StackNavigationProp<ProfileStackParamList>
>;
