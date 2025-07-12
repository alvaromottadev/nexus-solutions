import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    justifyContent: 'center',
    height: 128,
    backgroundColor: THEME.colors.cardColor,
    borderRadius: 8,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  infoContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  text: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.bold,
    maxWidth: '80%',
  },
  description: {
    fontFamily: THEME.fonts.poppins.regular,
    maxWidth: '80%',
    maxHeight: '80%',
  },
});
