import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },

  description: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
  },

  legendTitle: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
  },

  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 2,
  },

  square: {
    width: 15,
    height: 15,
  },

  legendValue: {
    marginLeft: 10,
  },

  test: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
