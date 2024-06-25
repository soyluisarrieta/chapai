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

import {Camera, useCameraDevices} from 'react-native-vision-camera';
let tflite = new Tflite();

export default function App() {
  const camera = useRef<Camera>(null);
  const [photoPath, setPhotoPath] = useState<string>();
  const [imagen, setImagen] = useState<string>();
  const [cameraPermission, setCameraPermission] = useState<string>();
  const [result, setResult] = useState<string>();
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
  const classifyPicture = () => {
    /**
     * If the user has a picture selected, classify it using the selected tflite
     * model.
     */
    if (photoPath != null) {
      // run the image against the loaded model
      try {
        tflite.runModelOnImage(
          {
            path: photoPath,
            numResults: 5,
            threshold: 0,
          },
          (err: Error, res: any) => {
            if (err) {
              console.log(err + '\n' + res);
            } else {
              setResult(res);
              console.log(res);
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

  return (
    <View>
      <Camera
        ref={camera}
        style={[styles.camera, styles.photoAndVideoCamera]}
        device={cameraDevice}
        isActive
        photo
      />
      <TouchableOpacity style={styles.btn} onPress={handleTakePhoto}>
        <Text style={styles.btnText}>Take Photo</Text>
      </TouchableOpacity>
      {photoPath && <Image style={styles.image} source={{uri: photoPath}} />}
      <TouchableOpacity style={styles.btn} onPress={classifyPicture}>
        <Text style={styles.btnText}>classify Picture</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={result}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>
                {item.label}: {item.confidence.toFixed(2)}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noResults}>No results</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 460,
    width: '92%',
    alignSelf: 'center',
  },
  photoAndVideoCamera: {
    height: 360,
  },
  btn: {
    backgroundColor: '#63995f',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    marginHorizontal: 16,
    paddingTop: 8,
    width: 80,
    height: 80,
  },
  resultItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
  },
  noResults: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
