import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },

  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },

  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
  },

  message: {
    textAlign: 'center',
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    marginTop: 20,
    height: 60,
    width: 150,
    backgroundColor: '#04d361',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },

  buttonCancel: {
    marginTop: 20,
    height: 60,
    width: 150,
    backgroundColor: '#808080',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },

  buttonReport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 60,
    width: '100%',
    backgroundColor: '#0000ff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },

  buttonDashboard: {
    marginRight: 5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;