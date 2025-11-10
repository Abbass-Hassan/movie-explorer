import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { tabBarOptions } from './navigationConfig';

const Tab = createBottomTabNavigator();

const TabLabel = ({ title, color }) => <Text style={{ color }}>{title}</Text>;

const TabNavigator = () => (
  <Tab.Navigator screenOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <TabLabel title="Home" color={color} />,
      }}
      // TODO: Replace with fully featured HomeScreen implementation
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color }) => <TabLabel title="Search" color={color} />,
      }}
      // TODO: Replace with fully featured SearchScreen implementation
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ color }) => <TabLabel title="Favorites" color={color} />,
      }}
      // TODO: Replace with fully featured FavoritesScreen implementation
    />
  </Tab.Navigator>
);

export default TabNavigator;

