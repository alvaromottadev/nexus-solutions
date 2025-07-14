import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';

export default function BackButton() {
  const navigation = useTypedNavigation();

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={handleBackPress}>
        <ArrowLeftIcon size={24} color="#322866" />
      </TouchableOpacity>
    </View>
  );
}
