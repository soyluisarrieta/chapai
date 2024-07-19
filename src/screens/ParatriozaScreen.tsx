import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../theme';

export default function ParatriozaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Detalles sobre la Paratrioza (Punta Morada)
      </Text>

      <Image
        source={require('../assets/images/paratrioza.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeading}>Agente Causal</Text>
          <Text style={styles.sectionText}>
            La Paratrioza es causada por un fitoplasma conocido como Candidatus
            Liberibacter solanacearum, perteneciente a la clase
            Alphaproteobacteria. Este organismo habita en el floema de las
            plantas y es transmitido principalmente por el insecto vector
            Bactericella cockerelli Sulc.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeading}>Síntomas</Text>
          <Text style={styles.sectionText}>
            Los síntomas incluyen amarillamiento de las hojas, formación de
            nudos en el tallo, enanismo de la planta, desarrollo de tubérculos
            aéreos y reducción significativa en los rendimientos y tamaño de los
            tubérculos en cultivos como la papa.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeading}>Impacto y Manejo</Text>
          <Text style={styles.sectionText}>
            La Paratrioza puede causar pérdidas económicas significativas en
            cultivos comerciales de papa y otros miembros de las solanáceas. El
            manejo integrado de plagas incluye prácticas como la vigilancia
            epidemiológica, el uso de variedades resistentes y el control del
            insecto vector mediante insecticidas específicos.
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionHeading}>Manejo Integrado de PMP </Text>
          <Text style={styles.sectionText}>
            {'\n'} + Utilizar semilla certificada y descarte tubérculos
            cosechados de plantas con síntomas sospechosos o con presencia del
            insecto vector.
            {'\n'} + Evitar que el insecto llegue o se desplace fácilmente
            dentro de los cultivos. {'\n'} + Desinfectar herramientas de
            trabajo, maquinaría y la ropa del personal, porque los insectos
            vectores en su estado adulto pueden adherirse a cualquier
            superficie.{'\n'} + Evitar la movilización de cuadrillas de personal
            desde áreas con sospecha de presencia de las enfermedades o del
            insecto vector.{'\n'} + Monitorear y controlar la población del
            insecto vector.{'\n'} + Realizar monitoreo directo al cultivo en
            búsqueda de poblaciones del insecto vector.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#e9f3de',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary.normal,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.primary.dark,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.8)',
  },
});
