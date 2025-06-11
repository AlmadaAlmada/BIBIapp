import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Profile2 from '../../assets/profile2.png';
import Lupa from '../../assets/lupa.png';
import Filtro from '../../assets/filtro.png';
import { style } from '../BuscaTopo/styles';

interface BuscaTopoProps {
  onBuscar: (texto: string) => void;
}

export const BuscaTopo: React.FC<BuscaTopoProps> = ({ onBuscar }) => {
  const [textoBusca, setTextoBusca] = useState('');

  const handleInputChange = (texto: string) => {
    setTextoBusca(texto);
    onBuscar(texto); 
  };

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
          value={textoBusca}
          onChangeText={handleInputChange}
        />
      </View>

      <TouchableOpacity>
        <Image source={Filtro} style={style.iconRight} />
      </TouchableOpacity>
    </View>
  );
};
