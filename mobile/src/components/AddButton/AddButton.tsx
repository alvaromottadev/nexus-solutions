import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function AddButton() {
  return (
    <TouchableOpacity style={styles.addButton}>
      <Text>+</Text>
    </TouchableOpacity>
  );
}
