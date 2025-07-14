import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/LoginPage/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage/HomePage';
import { BoxArrowUpIcon, HouseIcon, UserIcon } from 'phosphor-react-native';
import { useContext } from 'react';
import { THEME } from '../assets/theme';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ProductPage from '../pages/ProductPage/ProductPage';
import { AuthContext } from '../contexts/auth';
import LoadingPage from '../pages/LandingPage/LoadingPage';
import ProductRegistrationPage from '../pages/ProductRegistrationPage/ProductRegistrationPage';

export type MainStackParamList = {
  Login: undefined;
  TabScreens: undefined;
  ProductRegistration: undefined;
};

export type TabParamList = {
  Inicio: undefined;
  Perfil: undefined;
  Produtos: undefined;
};

const LoginStack = createNativeStackNavigator<MainStackParamList>();

const Tab = createBottomTabNavigator<TabParamList>();

function LoginStackScreen() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Group>
        {!isAuthenticated ? (
          <LoginStack.Screen name="Login" component={LoginPage} />
        ) : (
          <>
            <LoginStack.Screen name="TabScreens" component={TabScreen} />
            <LoginStack.Screen
              name="ProductRegistration"
              component={ProductRegistrationPage}
            />
          </>
        )}
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
      <Tab.Screen
        name="Produtos"
        component={ProductPage}
        options={{
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarIcon: ({ color }) => <BoxArrowUpIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!isLoading ? (
        isAuthenticated ? (
          <>
            <LoginStackScreen />
          </>
        ) : (
          <LoginStackScreen />
        )
      ) : (
        <LoadingPage />
      )}
    </NavigationContainer>
  );
}
