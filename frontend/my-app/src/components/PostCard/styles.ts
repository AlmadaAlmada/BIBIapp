import { themas } from "../../global/themes";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
   
    card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    //marginHorizontal: 16,
    elevation: 10,
    width: 405
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontWeight: "bold",
    color: themas.colors.primary,
  },
  content: {
    marginVertical: 6,
    color: themas.colors.secondary,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    marginVertical: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 16,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 8,
  },
  commentUserImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  commentText: {
    fontSize: 13,
    color: "#333",
  },
  likeIcon:{
    width: 24,
    height: 24,
    marginRight: 12,
  },
  commenIcon:{
    width: 24,
    height: 24,
  }, 

})