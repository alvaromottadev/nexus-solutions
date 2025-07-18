import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { TouchableProps } from 'react-native-svg';
import { PlusIcon } from 'phosphor-react-native';

interface AddButtonProps extends TouchableProps {}

export default function AddButton({ ...props }: AddButtonProps) {
  return (
    <TouchableOpacity style={styles.addButton} {...props}>
      <Text>
        <PlusIcon color="white" size={14} />
      </Text>
    </TouchableOpacity>
  );
}
