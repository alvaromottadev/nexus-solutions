/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import Toast from 'react-native-toast-message';
import AuthProvider from './src/contexts/auth';
import { PaperProvider } from 'react-native-paper';

function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar barStyle={'dark-content'} />
        <AppRoutes />
        <Toast autoHide={true} visibilityTime={3000} />
      </AuthProvider>
    </PaperProvider>
  );
}

export default App;
