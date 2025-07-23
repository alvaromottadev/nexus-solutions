import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  codeContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  qrCode: {
    marginTop: 5,
  },
  title: {
    fontFamily: THEME.fonts.poppins.bold,
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '80%',
    height: 200,
    borderColor: THEME.colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: THEME.fonts.poppins.regular,
  },
});
