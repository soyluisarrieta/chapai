import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {Tflite} from 'react-native-tflite-classification';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
let tflite = new Tflite();

export default function App({navigation}: any) {
  const camera = useRef<Camera>(null);
  const [photoPath, setPhotoPath] = useState<string>();
  const [imagen, setImagen] = useState<string>();
  const [cameraPermission, setCameraPermission] = useState<string>();
  const [result, setResult] = useState<any>([]);
  useEffect(() => {
    // check if this is the first time app is being opened. If it is,
    // move the starter model and image from android assets folder to internal
    // storage
    const loadApp = async () => {
      if (!(await RNFS.exists(RNFS.DocumentDirectoryPath + '/Model'))) {
        await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/Model');
        await RNFS.copyFileAssets(
          'Model/plant-disease.tflite',
          RNFS.DocumentDirectoryPath + '/Model/plant-disease.tflite',
        );
        await RNFS.copyFileAssets(
          'Model/plant-disease.txt',
          RNFS.DocumentDirectoryPath + '/Model/plant-disease.txt',
        );
        await RNFS.copyFileAssets(
          'example.jpg',
          RNFS.DocumentDirectoryPath + '/example.jpg',
        );
      }
      setImagen('file://' + RNFS.DocumentDirectoryPath + '/example.jpg');
      console.log('file://' + RNFS.DocumentDirectoryPath + '/example.jpg');
      //const mlt = await multiply(3, 7);
      //console.log(mlt);

      const directoryPath = RNFS.DocumentDirectoryPath;
      // Llama a readDir para listar los archivos
      RNFS.readDir(directoryPath)
        .then(resultPath => {
          console.log('GOT RESULT', JSON.stringify(resultPath, null, 2));
          RNFS.readDir(resultPath[0].path).then(resultDir => {
            console.log('File ', JSON.stringify(resultDir, null, 2));
          });
        })
        .catch((err: any) => {
          console.log(err.message, err.code);
        });
      // start with example photo to clasify
      // load model
      tflite.loadModel(
        {
          modelPath: '/Model/plant-disease.tflite',
          labelsPath: '/Model/plant-disease.txt',
        },
        (err: Error, res: any) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        },
      );
    };
    loadApp();
  }, []);
  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  const devices = useCameraDevices();
  const cameraDevice = devices[0];
  const handleTakePhoto = async () => {
    try {
      const photo = await camera.current!.takePhoto({
        flash: 'off',
      });
      console.log(photo.path);
      setPhotoPath(`file://${photo.path}`);
      // Esperar 3 segundos antes de ejecutar el método de clasificación
      setTimeout(() => {
        classifyPicture(photo.path);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const checkFileExists = async () => {
      if (imagen) {
        const exists = await RNFS.exists(imagen);
        console.log('Exist', exists);
      }
    };

    checkFileExists();
  }, [imagen]);
  const classifyPicture = (photo: string) => {
    /**
     * If the user has a picture selected, classify it using the selected tflite
     * model.
     */
    if (photo != null) {
      // run the image against the loaded model
      try {
        tflite.runModelOnImage(
          {
            path: photo,
            numResults: 5,
            threshold: 0,
          },
          (err: Error, res: any) => {
            if (err) {
              console.log(err + '\n' + res);
            } else {
              setResult(res[0]);
              console.log(res[0]);
            }
          },
        );
      } catch (error) {
        console.log('Error al correr modelo', error);
      }
    } else {
      Alert.alert(
        'Please first take an image or select an image from your gallery!',
      );
    }
  };
  if (cameraPermission === 'denied') {
    return <Text>Loading...</Text>;
  }

  const resetCamera = () => {
    setPhotoPath('');
    setPhotoPath('');
    setResult([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {photoPath ? (
          <Image source={{uri: photoPath}} style={styles.previewImage} />
        ) : (
          <Camera
            ref={camera}
            style={styles.camera}
            device={cameraDevice}
            isActive
            photo
          />
        )}
        {!photoPath && (
          <TouchableOpacity
            style={styles.takePhotoButton}
            onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>
        )}
      </View>

      {photoPath && (
        <View style={styles.resultContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={resetCamera}>
              <Text style={styles.buttonText}>Volver a la Cámara</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.resultTitle}>Enfermedad Detectada:</Text>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>
              {result.label === 'Tizón tardío de la papa' ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.classifyButton}
                    onPress={() => navigation.navigate('Gota')}>
                    <Text style={styles.buttonText}>{result.label}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text>{result.label}</Text>
                </View>
              )}
            </Text>
            <Text style={styles.resultConfidence}>
              {result.length === 0 ? (
                <View>
                  <Text>--- Procesando ----</Text>
                </View>
              ) : (
                <View>
                  <Text>
                    Confianza: {(result.confidence * 100).toFixed(2)}%
                  </Text>
                </View>
              )}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cameraContainer: {
    position: 'relative',
    width: '100%',
    height: '70%',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  takePhotoButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  classifyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  resultItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  resultConfidence: {
    fontSize: 14,
    color: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
