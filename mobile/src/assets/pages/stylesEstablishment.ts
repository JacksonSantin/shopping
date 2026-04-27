import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  item: {
    width: '92%',
    fontSize: 18,
  },

  deleteButton: {
    width: 25,
    height: 25,
  },

  errorMessage: {
    color: '#f00',
    textAlign: 'center',
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
