import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213D',
    justifyContent: 'center',
    padding: 40,
  },

  infoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 40,
  },

  buttonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 18,
    marginTop: 5,
  },

  buttonTextLogout: {
    fontFamily: 'Archivo_700Bold',
    color: '#E5E5E5',
    fontSize: 15,
    marginLeft: 5,
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
  },

  textoImg: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 27,
    textAlign: 'center',
    color: '#E5E5E5',
  },

  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#E5E5E5',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
    textAlign: 'center'
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },

  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 18,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#FCA311',
  },

  buttonSecondary: {
    backgroundColor: '#FCA311'
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#E5E5E5',
    fontSize: 15,
  },

  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#E5E5E5',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },
});

export default styles;
