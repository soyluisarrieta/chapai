import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './navigation/Routes';
import {Camera} from 'react-native-vision-camera';
import {NavigationContainer} from '@react-navigation/native';
import CameraScreen from './screens/CameraScreen';
import PermissionScreen from './screens/PermissionScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootStackNavigator from './navigation/RootStackNavigator';
const Stack = createNativeStackNavigator<Routes>();

export default function App(): React.ReactElement | null {
  return <RootStackNavigator />;
}
