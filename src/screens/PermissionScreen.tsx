import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Linking} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import IconComponent from '../components/IconComponent';
import {COLORS} from '../theme';

export default function PermissionScreen({
  navigation,
}: any): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
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
      <IconComponent name="camera" color={COLORS.primary.light} size={100} />
      <Text style={styles.welcome}>Habilitar el acceso a la cámara</Text>
      <View style={styles.permissionContainer}>
        {cameraPermissionStatus !== 'granted' ? (
          <Text style={styles.permissionText}>
            ChapAI necesita tu permiso para acceder a la cámara.
          </Text>
        ) : (
          <Text style={styles.permissionText}>
            ¡Permiso de cámara concedido! Ahora puedes usar la cámara.
          </Text>
        )}
        {cameraPermissionStatus !== 'granted' && (
          <Pressable style={styles.button} onPress={requestCameraPermission}>
            <Text style={{textAlign: 'center', color: COLORS.primary.dark}}>
              Permitir
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.dark,
    padding: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  permissionContainer: {
    width: width * 0.7,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
    color: 'rgba(255,255,255,0.7)',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: COLORS.primary.actived,
    padding: 20,
    borderRadius: 999,
    marginTop: 20,
  },
});
