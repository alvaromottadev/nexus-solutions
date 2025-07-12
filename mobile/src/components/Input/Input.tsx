import { Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
}

export default function Input({ label }: InputProps) {
  return (
    <>
      <TextInput style={styles.input} />
    </>
  );
}
