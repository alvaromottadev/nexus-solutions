import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../routes/AppRoutes';

export const useTypedNavigation = () => {
  return useNavigation<NativeStackNavigationProp<MainStackParamList>>();
};
