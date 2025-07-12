import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/LoginPage/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage/HomePage';
import { House } from '@phosphor-icons/react';
import { HouseIcon, UserIcon } from 'phosphor-react-native';
import { Profiler } from 'react';
import { THEME } from '../assets/theme';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

type LoginStackParamList = {
  Login: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

const Tab = createBottomTabNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <LoginStack.Group>
        <LoginStack.Screen name="Login" component={LoginPage} />
      </LoginStack.Group>
    </LoginStack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomePage}
        options={{
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarIcon: ({ color }) => <HouseIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfilePage}
        options={{
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <TabScreen />
    </NavigationContainer>
  );
}
