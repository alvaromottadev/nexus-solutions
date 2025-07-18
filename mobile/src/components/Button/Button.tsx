import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
}

export default function Button({ title, textColor, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text
        style={[
          styles.title,
          textColor ? { color: textColor } : { color: 'white' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
