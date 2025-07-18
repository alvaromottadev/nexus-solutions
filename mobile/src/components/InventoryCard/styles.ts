import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    height: 128,
    backgroundColor: THEME.colors.cardColor,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 10,
    padding: 10,
    overflow: 'hidden',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  text: {
    fontFamily: THEME.fonts.poppins.bold,
    color: 'black',
  },
  boxQuantityStock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  quantityStockContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
