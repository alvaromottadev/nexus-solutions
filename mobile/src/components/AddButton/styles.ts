import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  addButton: {
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
