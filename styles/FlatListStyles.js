import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    padding: 15,
  },
  image: {
    flex: 4,
    height: 300,
    marginEnd: 15,
  },
  textBox: {
    flex: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 15,
  },
});
