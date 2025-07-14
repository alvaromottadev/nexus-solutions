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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
  text: {
    alignSelf: 'center',
    fontFamily: THEME.fonts.poppins.medium,
    color: THEME.colors.primary,
  },
});
