import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    fontFamily: THEME.fonts.poppins.medium,
    color: THEME.colors.primary,
  },
});
