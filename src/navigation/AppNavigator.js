import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import defaultScreenOptions from './navigationConfig';
import DetailsScreen from '../screens/DetailsScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

// Main navigation structure: Tab navigator (Home/Search/Favorites) + Details screen
const AppNavigator = () => {
  const { colors, isDark } = useTheme();

  const navigationTheme = useMemo(() => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.surface,
        notification: colors.accent,
      },
    };
  }, [colors, isDark]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

