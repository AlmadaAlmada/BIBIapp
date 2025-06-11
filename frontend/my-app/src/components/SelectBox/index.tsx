import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SelectBoxProps = {
  items: { label: string, value: string }[];
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  style?: any;
  dropDownStyle?: any;
};

export default function SelectBox({
  items,
  placeholder = "Selecione uma opção",
  defaultValue = '',
  onValueChange,
  style,
  dropDownStyle
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState(items);

  useEffect(() => {
    setOptions(items);
  }, [items]);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', height: 80 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(value);
          setValue(newValue);
          onValueChange?.(newValue);
        }}
        setItems={setOptions}
        placeholder={placeholder}
        style={[{
          backgroundColor: '#eee',
          borderColor: '#ccc',
          zIndex: 2
        }, style]}
        dropDownContainerStyle={[{
          backgroundColor: '#f5f5f5'
        }, dropDownStyle]}
        listItemLabelStyle={{
          color: '#002b45',
          fontWeight: 'bold'
        }}
        selectedItemLabelStyle={{
          color: '#0071bc'
        }}
      />
    </View>
  );
}
