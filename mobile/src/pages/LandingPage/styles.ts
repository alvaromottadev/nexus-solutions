import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 256,
    height: 64,
    marginBottom: 20,
  },
  text: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.medium,
    fontSize: 24,
    marginBottom: 10,
  },
});
