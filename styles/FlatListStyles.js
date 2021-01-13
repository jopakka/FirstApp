import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#32CD32',
    padding: 8,
    marginBottom: 16,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'darkgreen',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: {width: 3, height: 3},
  },
  image: {
    flex: 4,
    height: 120,
    marginEnd: 8,
    borderRadius: 8,
  },
  textBox: {
    flex: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 15,
  },
});
