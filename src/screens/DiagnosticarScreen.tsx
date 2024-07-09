import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
export default function DiagnosticarScreen({navigation}: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Diagnóstico de Enfermedades en Cultivos
      </Text>
      <Text style={styles.heading}>Diagnóstico de la Paratrioza</Text>
      <Text style={styles.text}>
        La Punta Morada de la papa es una enfermedad compleja identificada
        inicialmente en Suramérica, afectando gravemente los cultivos de papa en
        regiones como Ecuador y el sur de Colombia. Se transmite principalmente
        a través del insecto vector Bactericella cockerelli Sulc., también
        conocido como Paratrioza.
      </Text>
      <View style={styles.imageGrid}>
        <Image
          source={require('../assets/images/paratrioza_vector.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../assets/images/paratrioza_huevos.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../assets/images/pmp_tallos.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../assets/images/pmp_hojas.jpg')}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Paratrioza')}>
        <Text style={styles.buttonText}>Diagnosticar</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Diagnóstico de Tizón Tardío</Text>
      <Text style={styles.text}>
        El tizón tardío, causado por el hongo Phytophthora infestans, es una
        enfermedad devastadora que afecta principalmente a plantas de la familia
        de las solanáceas, como la papa y el tomate.
      </Text>
      <View style={styles.imageGrid}>
        <Image
          source={require('../assets/images/gota.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../assets/images/late_blight_329.jpg')}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Gota')}>
        <Text style={styles.buttonText}>Diagnosticar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 23,
    color: 'black',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,

    alignItems: 'baseline',
  },
  image: {
    width: '50%',
    height: 140,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
