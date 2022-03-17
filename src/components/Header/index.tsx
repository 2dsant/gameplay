import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { Icon, Button } from 'react-native-elements';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = {
  title: string,
  action?: ReactNode;
}

export function Header({ title, action }: Props) {
  const { secondary100, secondary40, heading } = theme.colors;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <Button
        onPress={handleGoBack}
        type="clear"
        icon={<Icon name="arrow-back" size={24} color={heading} />}
      />

      <Text style={styles.title}>{title}</Text>

      {
        action ?
          <View>
            {action}
          </View>
          :
          <View style={{ width: 24 }} />
      }
    </LinearGradient>
  )
}
