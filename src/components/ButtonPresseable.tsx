import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import {COLORS} from '../theme';

interface ButtonTextProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'actived';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export default function ButtonText({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  textStyle,
  children,
  ...props
}: ButtonTextProps) {
  const buttonStyles = [
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.text,
    sizeTextStyles[size],
    variantTextStyles[variant],
    textStyle,
  ];

  return (
    <Pressable style={buttonStyles} {...props}>
      <Text style={textStyles}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  icon: {
    padding: 8,
    borderRadius: 50,
  },
});

const sizeTextStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 20,
  },
  icon: {
    fontSize: 0,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary.normal,
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  actived: {
    backgroundColor: COLORS.primary.actived,
  },
});

const variantTextStyles = StyleSheet.create({
  primary: {
    color: 'white',
  },
  secondary: {
    color: 'white',
  },
  actived: {
    color: COLORS.primary.dark,
  },
});
