import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Linking} from 'react-native';

import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
//import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export default function PermissionScreen({
  navigation,
}: any): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);
  useEffect(() => {
    if (cameraPermissionStatus === 'granted') {
      navigation.replace('CameraScreen', {name: 'CameraScreen'});
    }
  }, [cameraPermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'granted' && (
          <Text style={styles.permissionText}>
            Vision Camera needs{' '}
            <Text style={styles.bold}>Camera permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              <Button title="Grant" onPress={requestCameraPermission} />
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...[1, 1, 1, 1],
  },
  permissionsContainer: {
    marginTop: 15 * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
