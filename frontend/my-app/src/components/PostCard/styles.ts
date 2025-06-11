import { themas } from "../../global/themes";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({

  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 10,
    width: '100%'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontWeight: "600",
    color: themas.colors.primary,
  },
  content: {
    margin: 10,
    color: '#003049',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  actions: {
    width: '80%',
    gap: '100%',
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 15
  },
  icon: {
    fontSize: 20,
    marginRight: 16,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    padding: 15,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
    bottom: 30
  },
  commentText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#30495A",
  },
  likeIcon: {
    width: 24,
    height: 24,
  },
  commenIcon: {
    width: 24,
    height: 24,
  },

})