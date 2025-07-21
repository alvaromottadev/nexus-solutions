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
import LoadingPage from '../pages/LoadingPage/LoadingPage';
import ProductRegistrationPage from '../pages/ProductRegistrationPage/ProductRegistrationPage';
import InventoryPage from '../pages/InventoryPage/InventoryPage';
import InventoryRegistrationPage from '../pages/InventoryRegistrationPage/InventoryRegistrationPage';
import { ProductType } from '../types/ProductType';
import ProductEditPage from '../pages/ProductEditPage/ProductEditPage';
import MovementRegistrationPage from '../pages/MovementRegistrationPage/MovementRegistrationPage';
import QrCodeScannerPage from '../pages/QrCodeScannerPage/QrCodeScannerPage';

export type MainStackParamList = {
  Login: undefined;
  TabScreens: undefined;
  ProductRegistration: undefined;
  InventoryPage: undefined;
  InventoryRegistration: undefined;
  ProductEdit: { product?: ProductType };
  MovementRegistration: undefined;
  QrCodeScanner: { isActive: boolean; onScan: (data: string) => void };
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
              options={{ headerShown: true, title: 'Cadastro de Produto' }}
            />
            <LoginStack.Screen
              name="InventoryPage"
              component={InventoryPage}
              options={{ headerShown: true, title: 'Estoque' }}
            />
            <LoginStack.Screen
              name="InventoryRegistration"
              component={InventoryRegistrationPage}
              options={{ headerShown: true, title: 'Cadastro de Estoque' }}
            />
            <LoginStack.Screen
              name="ProductEdit"
              component={ProductEditPage}
              options={{ headerShown: true, title: 'Editar Produto' }}
            />
            <LoginStack.Screen
              name="MovementRegistration"
              component={MovementRegistrationPage}
              options={{ headerShown: true, title: 'Registro de Movimentação' }}
            />
            <LoginStack.Screen
              name="QrCodeScanner"
              component={QrCodeScannerPage}
              options={{ headerShown: false }}
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
