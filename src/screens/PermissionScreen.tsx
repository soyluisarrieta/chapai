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
    <View style={styles.contenedor}>
      <Text style={styles.bienvenida}>Bienvenido a{'\n'}Chapai Camera.</Text>
      <View style={styles.contenedorPermisos}>
        {cameraPermissionStatus !== 'granted' ? (
          <Text style={styles.textoPermiso}>
            Chapai Camera necesita{' '}
            <Text style={styles.negrita}>permiso para la cámara</Text>.{' '}
            <Button
              title="Conceder Permiso"
              onPress={requestCameraPermission}
            />
          </Text>
        ) : (
          <Text style={styles.textoPermiso}>
            ¡Permiso de cámara concedido! Ahora puedes usar la cámara.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contenedorPermisos: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  textoPermiso: {
    fontSize: 18,
    textAlign: 'center',
  },
  negrita: {
    fontWeight: 'bold',
  },
});
