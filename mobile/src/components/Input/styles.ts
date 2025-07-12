import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    borderColor: THEME.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
