import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

import { style } from "././styles";

import LikeIcon from '../../assets/likeIcon.png'
import CommenIcon from '../../assets/commenIcon.png'

import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  userName: string;
  userImage: any;
  content: string;
  postImage?: any;
  comments: string[];
}


export const PostCard = ({ userName, userImage, content, postImage, comments }: Props) => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={style.card}>

      <View style={style.header}>
        <Image source={userImage} style={style.userImage} />
        <Text style={style.userName}>{userName}</Text>
      </View>


      <Text style={style.content}>{content}</Text>

      {postImage && <Image source={postImage} style={style.postImage} />}


      <View style={style.actions}>
        <TouchableOpacity>
          <Image source={LikeIcon} style={style.likeIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ModalComent")}>
          <Image source={CommenIcon} style={style.commenIcon} />

        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Text style={style.icon}></Text>
        </TouchableOpacity>
      </View>

      {comments.map((comment, index) => (
        <View key={index} style={style.commentContainer}>
          <Image source={userImage} style={style.commentUserImage} />
          <Text style={style.commentText}>{comment}</Text>
        </View>
      ))}
    </View>
  );
};