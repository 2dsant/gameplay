import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from "../../global/styles/theme";

export function Trash({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.container}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name="delete"
        color={theme.colors.heading}
        size={24}
      />
    </TouchableOpacity>
  )
}