import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginLeft: 35,
    fontSize: 14,
    fontFamily: THEME.fonts.poppins.bold,
  },
  select: {
    width: '100%',
    alignItems: 'center',
  },
  selectDisabled: {
    opacity: 0.5,
  },
});
