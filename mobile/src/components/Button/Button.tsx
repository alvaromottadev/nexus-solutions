import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
