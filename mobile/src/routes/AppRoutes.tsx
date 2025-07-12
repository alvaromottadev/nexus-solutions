import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/LoginPage/LoginPage';
import { NavigationContainer } from '@react-navigation/native';

type LoginStackParamList = {
  Login: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

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

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
}
