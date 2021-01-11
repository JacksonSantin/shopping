import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },

  nfIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    alignSelf: 'flex-end',
  },

  listItem: {},

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

  deleteIcon: {
    width: '100%',
    height: '100%',
  },

  errorMessage: {
    color: '#f00',
    textAlign: 'center',
  },
});

export default styles;
