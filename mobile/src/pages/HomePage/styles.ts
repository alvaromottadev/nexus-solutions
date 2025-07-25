import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
  },
  title: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.bold,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});
