import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
  isPressed?: boolean;
}

export default function Button({
  title,
  textColor,
  isPressed = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, props.style, isPressed && styles.buttonPressed]}
    >
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
