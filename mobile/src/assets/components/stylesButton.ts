import { StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 4,
    borderColor: theme.colors.buttonBorder,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default styles;