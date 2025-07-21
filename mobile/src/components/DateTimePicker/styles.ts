import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  label: {
    fontFamily: THEME.fonts.poppins.bold,
    color: THEME.colors.primary,
    lineHeight: 20,
  },
  select: {
    width: '100%',
    height: 47,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: THEME.colors.primary,
  },
});

export default styles;
