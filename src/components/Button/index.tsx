import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import { styles } from './styles';

type props = TouchableOpacityProps & {
  title: string
}

export function Button({ title, ...rest }: props) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}