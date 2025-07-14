import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.bold,
    fontSize: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
  welcomeText: {
    fontFamily: THEME.fonts.poppins.regular,
    fontSize: 16,
    marginBottom: 12,
  },
  image: {
    width: 224,
    height: 224,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
