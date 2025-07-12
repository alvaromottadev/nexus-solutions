import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: THEME.colors.primary,
    color: THEME.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  error: {
    borderColor: THEME.colors.error,
    color: THEME.colors.error,
  },
  label: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.bold,
  },
  container: {
    width: '80%',
    display: 'flex',
    gap: 5,
  },
});
