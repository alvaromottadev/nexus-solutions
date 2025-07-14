import { Text, TextProps } from 'react-native';
import { styles } from './styles';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

export default function CustomText({
  children,
  style,
  ...props
}: CustomTextProps) {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
}
