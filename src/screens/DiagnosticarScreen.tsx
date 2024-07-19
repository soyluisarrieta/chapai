import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme';
import ButtonText from '../components/ButtonPresseable';
export default function DiagnosticarScreen({navigation}: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.decoration} />
      <Text
        style={[
          styles.heading,
          {color: COLORS.primary.actived, marginTop: 0, marginBottom: 20},
        ]}>
        Diagnóstico de Enfermedades en Cultivos
      </Text>

      <Text style={styles.heading}>Diagnóstico de la Paratrioza</Text>
      <View style={{marginBottom: 20}}>
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View style={{width: 20}} />
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
        </ScrollView>
      </View>
      <Text style={styles.text}>
        La Punta Morada de la papa es una enfermedad compleja identificada
        inicialmente en Suramérica, afectando gravemente los cultivos de papa en
        regiones como Ecuador y el sur de Colombia. Se transmite principalmente
        a través del insecto vector Bactericella cockerelli Sulc., también
        conocido como Paratrioza.
      </Text>
      <ButtonText
        style={{paddingHorizontal: 50, alignSelf: 'center'}}
        onPress={() => navigation.navigate('Paratrioza')}>
        Diagnosticar
      </ButtonText>

      <Text style={styles.heading}>Diagnóstico de Tizón Tardío</Text>
      <View style={{marginBottom: 20}}>
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View style={{width: 20}} />
          <Image
            source={require('../assets/images/gota.jpg')}
            style={styles.image}
          />
          <Image
            source={require('../assets/images/late_blight_329.jpg')}
            style={styles.image}
          />
        </ScrollView>
      </View>
      <Text style={styles.text}>
        El tizón tardío, causado por el hongo Phytophthora infestans, es una
        enfermedad devastadora que afecta principalmente a plantas de la familia
        de las solanáceas, como la papa y el tomate.
      </Text>
      <ButtonText
        style={{paddingHorizontal: 50, alignSelf: 'center'}}
        onPress={() => navigation.navigate('Gota')}>
        Diagnosticar
      </ButtonText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: COLORS.primary.dark,
  },
  decoration: {
    width: 500,
    height: 300,
    borderRadius: 200,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: -170,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    color: 'rgba(255,255,255, 0.9)',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,

    alignItems: 'baseline',
  },
  image: {
    width: 270,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 7,
  },
});
