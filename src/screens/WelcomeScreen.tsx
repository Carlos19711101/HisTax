import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }: any) => {
  const exitApp = () => {
    Alert.alert(
      'Cerrar aplicación',
      '¿Estás seguro que deseas salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient
      colors={['#090FFA', '#6E45E2', '#88D3CE']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Botón de salida - Estilo original */}
      <TouchableOpacity style={styles.exitButton} onPress={exitApp}>
        <AntDesign name="logout" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Descubre una experiencia única diseñada para ti</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('AuthScreen')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>

      {/* Texto "producido por" agregado en la parte inferior */}
      <Text style={styles.footerText}>producido por:</Text>
      <Text style={styles.footer1Text}>Global Solutions IA</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#cacbd6',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#6E45E2',
    fontSize: 18,
    fontWeight: '500',
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    margin: 10,
    padding: 10,
  },
  // Nuevo estilo para el texto del footer
  footerText: {
    position: 'absolute',
    bottom: 80,
    color: 'rgba(235, 238, 236, 0.2)',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    opacity: 0.8,
  },
  footer1Text: {
    position: 'absolute',
    bottom: 50,
    color: 'rgba(237, 237, 229, 0.2)',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    opacity: 10,
  },
});

export default WelcomeScreen;