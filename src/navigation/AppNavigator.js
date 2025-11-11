import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import defaultScreenOptions from './navigationConfig';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

// Main navigation structure: Tab navigator (Home/Search/Favorites) + Details screen
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

