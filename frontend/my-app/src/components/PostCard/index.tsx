import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

import { style } from "././styles";

import LikeIcon from '../../assets/likeIcon.png'
import CommenIcon from '../../assets/commenIcon.png'

import Alerta from '../../pages/Alerta';

import House from '../../assets/house.png'
import Car from '../../assets/car.png'
import Chat from '../../assets/chat.png'
import Settings from '../../assets/settings.png'
import Profile from '../../assets/profile.png'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface Props {
  userName: string;
  userImage: any;
  content: string;
  postImage?: any;
  comments: string[];
}

export const PostCard = ({ userName, userImage, content, postImage, comments }: Props) => {
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
        <TouchableOpacity>
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