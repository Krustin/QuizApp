import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import PlayScreen from '../screens/PlayScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import EncyclopediaScreen from '../screens/EncyclopediaScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#169C8F',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Play"
        component={PlayScreen}
        options={{
          title: 'Spielen',
          tabBarIcon: () => '🎯',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Kategorien',
          tabBarIcon: () => '📚',
        }}
      />
      <Tab.Screen
        name="Encyclopedia"
        component={EncyclopediaScreen}
        options={{
          title: 'Lexikon',
          tabBarIcon: () => '📖',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: () => '👤',
        }}
      />
    </Tab.Navigator>
  );
}
