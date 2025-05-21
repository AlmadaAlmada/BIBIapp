import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: themas.colors.secondary,
  },
  iconLeft: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  iconRight: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
