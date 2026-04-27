import { StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },

  label: {
    color: theme.colors.secondary,
    paddingLeft: 4,
    opacity: 0.8,
  },

  input: {
    width: '100%',
    color: theme.colors.secondary,
  },

  error: {
    width: '100%',
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
  },
});

export default styles;