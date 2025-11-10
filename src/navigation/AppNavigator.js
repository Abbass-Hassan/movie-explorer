import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import defaultScreenOptions from './navigationConfig';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const SplashWrapper = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('[AppNavigator] Navigating from Splash to Main');
      navigation.replace('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return <SplashScreen />;
};

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Splash"
        component={SplashWrapper}
        // TODO: Replace with fully implemented SplashScreen when ready
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        // TODO: Ensure Main navigator handles additional screens when implemented
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

