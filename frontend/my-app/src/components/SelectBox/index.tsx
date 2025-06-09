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

  // 🔥 Atualiza as opções sempre que items mudar
  useEffect(() => {
    setOptions(items);
  }, [items]);

  return (
    <View style = {style.SelectBox}>
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
      />
    </View>
  );
}
