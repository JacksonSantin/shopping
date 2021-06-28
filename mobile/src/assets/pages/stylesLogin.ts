import { StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

const styles = StyleSheet.create({
  errorMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50
  },

  alert: {
    fontSize: 18,
    color: theme.colors.error,
    margin: 20,
    marginLeft: 5,
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  label: {
    color: theme.colors.secondary,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default styles;
