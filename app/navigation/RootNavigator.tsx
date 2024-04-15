import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FunctionComponent } from "react";
import { HomeScreen } from "../screens/HomeScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { RootStackParamList } from "../types/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "GitHub Search" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "Details" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
