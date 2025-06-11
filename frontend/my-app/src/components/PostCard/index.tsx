import React from "react";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { style } from "././styles";
import LikeIcon from '../../assets/likeIcon.png';

interface Props {
  userName?: string;
  content: string;
}


export const PostCard = ({ userName, content}: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={style.card}>
            <View style={style.header}>
                <Text style={style.userName}>{userName}</Text>
            </View>

            <Text style={style.content}>{content}</Text>
        </View>
  );
};