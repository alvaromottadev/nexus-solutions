import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  isError?: boolean;
}

export default function Input({
  label,
  isError = false,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, isError && styles.error]}>{label}</Text>
      )}
      <TextInput {...props} style={[styles.input, isError && styles.error]} />
    </View>
  );
}
