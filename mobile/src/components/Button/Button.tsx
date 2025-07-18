import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
