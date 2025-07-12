/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <AppRoutes />
      <Toast autoHide={true} visibilityTime={3000} />
    </>
  );
}

export default App;
