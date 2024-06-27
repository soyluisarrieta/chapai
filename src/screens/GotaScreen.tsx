import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function GotaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Información sobre el Tizón Tardío</Text>
      <View style={styles.sectionImage}>
        <Image
          source={require('../assets/images/gota2.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Ciclo de vida y propagación</Text>
        <Text style={styles.sectionText}>
          El tizón tardío es causado por el hongo *Phytophthora infestans*.
          Afecta principalmente a plantas de la familia de las solanáceas como
          la papa y el tomate. Se propaga a través de esporas dispersadas por el
          viento, el agua y el contacto directo entre plantas.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Síntomas</Text>
        <Text style={styles.sectionText}>
          Los síntomas incluyen manchas oscuras y acuosas en las hojas que
          pueden desarrollar un halo clorótico. Eventualmente, las hojas se
          marchitan y los tallos muestran manchas marrones que pueden extenderse
          y causar la muerte de la planta. En la papa, los tubérculos pueden
          desarrollar manchas oscuras y firmes bajo la piel.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Control y manejo</Text>
        <Text style={styles.sectionText}>
          Para controlar el tizón tardío, se recomienda usar variedades
          resistentes, practicar rotación de cultivos, mantener un buen
          espaciamiento entre plantas, eliminar restos de plantas infectadas y
          aplicar fungicidas preventivos de manera adecuada.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>
          Importancia económica y social
        </Text>
        <Text style={styles.sectionText}>
          El tizón tardío puede causar pérdidas significativas en cultivos
          comerciales de papa y tomate, afectando tanto a productores pequeños
          como grandes. Su manejo adecuado es crucial para asegurar la
          producción y la calidad de estos cultivos.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  sectionImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
