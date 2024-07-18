import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const {height} = Dimensions.get('window');

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Image
        source={require('../assets/images/plants-cover-home.jpg')}
        style={[styles.coverImg, {height: height * 0.7}]}
      />
      <View style={styles.infoContainer}>
        <Image
          source={require('../assets/images/chapai_img_rounded.png')}
          style={styles.logo}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>¡Bienvenido a nuestra app!</Text>
          <Text style={styles.welcomeText}>
            Somos un equipo de investigadores pertenecientes al SENA Ipiales
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImg: {
    width: '100%',
    height: '80%',
    objectFit: 'cover',
    position: 'absolute',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 130,
    position: 'relative',
    top: '65%',
    zIndex: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  logo: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: '-20%',
    zIndex: 2,
  },
  contentContainer: {
    width: '90%',
    padding: 10,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    opacity: 0.7,
  },
});
