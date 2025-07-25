import { StyleSheet } from 'react-native';
import { THEME } from '../../assets/theme';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    gap: 5,
    padding: 16,
  },
  cell: {
    color: THEME.colors.primary,
  },
});
