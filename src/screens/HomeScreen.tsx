import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/chapai_img.jpg')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>¡Bienvenido a nuestra app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
