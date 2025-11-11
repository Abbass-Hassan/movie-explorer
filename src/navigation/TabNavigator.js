import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { tabBarOptions } from './navigationConfig';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={24}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={focused ? 'search' : 'search-outline'}
            size={24}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Watch list"
      component={FavoritesScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={focused ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

