import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppSettings} from '../components/AppSettings';
import {NotFound} from '../components/NotFound';
import Profile from './Profile';
import Settings from './Settings';
import Home from './Home';
import AddRecipeScreen from './AddRecipe';
import RecipeDetailScreen from './RecipeDetails';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeResultScreen from './RecipeResult';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={Home} />
      <Stack.Screen name="AddRecipeScreen" options={{title: 'Add Recipe'}} component={AddRecipeScreen} />
      <Stack.Screen name="RecipeResultScreen" options={{title: 'Recipe Result'}} component={RecipeResultScreen} />
      <Stack.Screen name="RecipeDetailScreen" options={{title: 'Recipe Detail'}} component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserSettings"
        options={{title: appSettings.t('settings')}}
        component={Settings}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{title: appSettings.t('NotFound')}}
      />
    </Stack.Navigator>
  );
};

const SignedIn = () => {
  const appSettings = useAppSettings();
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      safeAreaInsets={insets}
      screenOptions={{tabBarStyle: {paddingBottom: 3}, headerShown: false}}>
      <BottomTab.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon(props) {
            return <Icon name="home" size={24} color={props.color} />;
          },
        }}
        component={HomeStack}
      />
      <BottomTab.Screen
        name="User"
        options={{
          title: appSettings.t('userInfo'),
          tabBarIcon(props) {
            return <Icon name="account" size={24} color={props.color} />;
          },
        }}
        component={ProfileStack}
      />
    </BottomTab.Navigator>
  );
};

export default SignedIn;
