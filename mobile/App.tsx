/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';

function App() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <AppRoutes />
    </>
  );
}

export default App;
