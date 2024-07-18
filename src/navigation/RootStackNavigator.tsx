/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import PermissionScreen from '../screens/PermissionScreen';
import CameraScreen from '../screens/CameraScreen';
import HomeScreen from '../screens/HomeScreen';
import {Routes} from './Routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import DiagnosticarScreen from '../screens/DiagnosticarScreen';
import GotaScreen from '../screens/GotaScreen';
import ParatriozaScreen from '../screens/ParatriozaScreen';
import IconComponent from '../components/IconComponent';

const HomeStack = createNativeStackNavigator<Routes>();

function DiagnosticarStackScreen(): React.ReactElement {
  return (
    <GestureHandlerRootView style={styles.root}>
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Diagnosticos" component={DiagnosticarScreen} />
        <HomeStack.Screen name="Gota" component={GotaScreen} />
        <HomeStack.Screen name="Paratrioza" component={ParatriozaScreen} />
      </HomeStack.Navigator>
    </GestureHandlerRootView>
  );
}

function HomeStackScreen(): React.ReactElement {
  return (
    <GestureHandlerRootView style={styles.root}>
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Chapai" component={HomeScreen} />
        <HomeStack.Screen name="CameraScreen" component={CameraScreen} />
      </HomeStack.Navigator>
    </GestureHandlerRootView>
  );
}

const SettingsStack = createNativeStackNavigator<Routes>();
//Configuracion para solicitar permiso de camara
function PermissionStackScreen() {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  useEffect(() => {
    setCameraPermission(Camera.getCameraPermissionStatus());
  }, []);
  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'granted';

  return (
    <GestureHandlerRootView style={styles.root}>
      <SettingsStack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
        initialRouteName={
          showPermissionsPage ? 'PermissionScreen' : 'CameraScreen'
        }>
        <SettingsStack.Screen
          name="PermissionScreen"
          component={PermissionScreen}
        />
        <SettingsStack.Screen name="CameraScreen" component={CameraScreen} />
        <SettingsStack.Screen name="Gota" component={GotaScreen} />
      </SettingsStack.Navigator>
    </GestureHandlerRootView>
  );
}

const Tab = createBottomTabNavigator();

export default function RootStackNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, ...props}) => {
            const name = route.name + (!focused ? '-outline' : '');
            return <IconComponent name={name.toLocaleLowerCase()} {...props} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Camera" component={PermissionStackScreen} />
        <Tab.Screen name="Diagnostic" component={DiagnosticarStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
