import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderColor: THEME.colors.primary,
    borderWidth: 1,
  },
  text: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.poppins.bold,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    gap: 5,
  },
  editContainer: {
    display: 'flex',
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  textInfo: {
    fontSize: 12,
  },
  logout: {
    width: '65%',
    marginTop: 20,
  },
});
