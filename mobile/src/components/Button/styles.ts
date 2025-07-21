import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.colors.primary,
    height: 50,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
  },
  buttonPressed: {
    backgroundColor: '#5A6D8A',
    opacity: 0.8,
  },
  title: {
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
});
