import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 8,
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
  alert: {
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 10,
    borderLeftColor: '#f00',
    fontSize: 18,
    backgroundColor: '#ff927e',
    color: '#fff',
    margin: 20,
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },
});

export default styles;
