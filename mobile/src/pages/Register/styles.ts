import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  alert: {
    fontSize: 18,
    backgroundColor: '#f00',
    color: '#fff',
    margin: 20,
    padding: 10,
    width: '100%',
    borderRadius: 4,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default styles;
