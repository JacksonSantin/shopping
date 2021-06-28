import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  title: {
    color: '#14213D',
    fontSize: 24,
    fontFamily: 'Archivo_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#14213D',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top'
  },

  errorMessage: {
    color: '#f00',
    textAlign: 'center',
  },

  nextButton: {
    backgroundColor: '#FCA311',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32
  },

  nextButtonText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    color: '#fff'
  },
});


export default styles;
