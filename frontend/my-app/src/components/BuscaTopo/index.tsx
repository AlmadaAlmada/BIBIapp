import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Supondo que você tenha essas imagens na pasta assets
import Profile2 from '../../assets/profile2.png';
import Lupa from '../../assets/lupa.png';
import Filtro from '../../assets/filtro.png';
import { style } from '../BuscaTopo/styles';

export const BuscaTopo = () => {
  return (
    <View style={style.container}>
   
      <TouchableOpacity>
        <Image source={Profile2} style={style.iconLeft} />
      </TouchableOpacity>


      <View style={style.searchContainer}>
        <Image source={Lupa} style={style.searchIcon} />
        <TextInput
          placeholder="Search"
          style={style.input}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity>
        <Image source={Filtro} style={style.iconRight} />
      </TouchableOpacity>
    </View>
  );
};
