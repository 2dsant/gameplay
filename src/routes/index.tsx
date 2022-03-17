import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AppRoutes } from './app.routes';
import { Background } from '../components/Background';
import { useAuth } from "../hooks/auth";
import { SignIn } from "../screens/SignIn";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export function Routes() {
  const { user } = useAuth();

  return (
    /* NavigationContainer Cuida das telas que foram abertas */
    <Background>
      <NavigationContainer theme={MyTheme}>
        {user.id ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Background>
  )
}