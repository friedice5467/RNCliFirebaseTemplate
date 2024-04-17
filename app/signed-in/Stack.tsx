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

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="AddRecipeScreen" component={AddRecipeScreen} options={{title: 'Add Recipe'}} />
      <Stack.Screen name="RecipeResultScreen" component={RecipeResultScreen} options={{title: 'Recipe Result'}} />
      <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{title: 'Recipe Detail'}} />
    </Stack.Navigator>
  );
};

const ProfileStack: React.FC = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen name="UserProfile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="UserSettings" component={Settings} options={{title: appSettings.t('settings')}} />
      <Stack.Screen name="NotFound" component={NotFound} options={{title: appSettings.t('NotFound')}} />
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
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'User') {
            iconName = 'account';
          }
          return <Icon name={iconName ?? ''} size={size} color={color} />;
        },
        tabBarStyle: {paddingBottom: 3},
        headerShown: false,
      })}>
      <BottomTab.Screen
  name="Home"
  component={HomeStack}
/>
<BottomTab.Screen
  name="User"
  component={ProfileStack}
  listeners={({ navigation }) => ({
    tabPress: e => {
      e.preventDefault(); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'User' }], 
      });
    },
  })}
/>

    </BottomTab.Navigator>
  );
};

export default SignedIn;
