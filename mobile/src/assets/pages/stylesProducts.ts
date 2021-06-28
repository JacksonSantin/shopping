import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    padding: 24,
    borderBottomWidth: 1,
    borderColor: '#dde3f9',
    width: '100%',
  },

  iconAndText: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  label: {
    marginLeft: 5,
    color: '#000000',
    fontFamily: 'Poppins_400Regular',
  },

  itemView: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },

  productTitle: {
    width: '92%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  item: {
    width: '100%',
    fontSize: 18,
  },

  deleteButton: {
    width: 30,
    height: 25,
  },

  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },

  createToDoList: {
    width: 56,
    height: 56,
    backgroundColor: '#FCA311',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
