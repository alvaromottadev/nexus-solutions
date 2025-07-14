import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      {children}
    </TouchableOpacity>
  );
}
