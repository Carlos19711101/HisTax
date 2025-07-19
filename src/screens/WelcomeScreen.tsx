import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

// Parámetros del patrón
const SQUARE_SIZE = 20;
const NUM_COLS = 4;
const FOOTER_EXTRA = 120;  // Ajusta según el tamaño de tu footer
const NUM_ROWS = Math.ceil((height + FOOTER_EXTRA) / SQUARE_SIZE);

// Gradiente de opacidad
const opacities = Array.from({ length: NUM_ROWS }, (_, i) =>
  +(0.10 + (0.6 * i) / (NUM_ROWS - 1)).toFixed(2)
);

const WelcomeScreen = ({ navigation }: any) => {
  const exitApp = () => {
    Alert.alert(
      'Cerrar aplicación',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const renderSidebar = () => (
    <View style={styles.sidebarContainer} pointerEvents="none">
      {Array.from({ length: NUM_ROWS }, (_, rowIdx) => (
        <View key={`row-${rowIdx}`} style={styles.row}>
          {[...Array(NUM_COLS)].map((_, colIdx) => {
            const isBlack = (rowIdx + colIdx) % 2 === 0;
            return (
              <View
                key={`cell-${rowIdx}-${colIdx}`}
                style={{
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  backgroundColor: isBlack
                    ? `rgba(0,0,0,${opacities[rowIdx]})`
                    : 'transparent',
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={['#fcf1b3', '#FFC300', '#FFA300']}
        style={[styles.container, { paddingTop: STATUS_BAR_HEIGHT }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Barra lateral checkerboard derecha, ahora cubre completamente toda la pantalla */}
        {renderSidebar()}

        <TouchableOpacity
          style={[styles.exitButton, { top: (STATUS_BAR_HEIGHT || 0) + 20 }]}
          onPress={exitApp}
        >
          <AntDesign name="logout" size={24} color="black" />
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

        <Text style={styles.footerText}>Respaldado por:</Text>
        <Text style={styles.footer1Text}>Global Solutions IA</Text>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SQUARE_SIZE * NUM_COLS,
    flexDirection: 'column',
    zIndex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '80%',
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(9, 13, 9, 0.7)',
    marginBottom: 15,
    textShadowColor: 'rgba(238, 236, 236, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(21, 27, 21, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: 'rgba(70, 6, 6, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: 'rgba(248, 243, 243, 0.94)',
    fontSize: 18,
    fontWeight: '500',
  },
  exitButton: {
    position: 'absolute',
    left: 30,
    zIndex: 2,
    padding: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 100,
    color: 'rgba(21, 244, 21, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
  footer1Text: {
    position: 'absolute',
    bottom: 70,
    color: 'rgba(18, 28, 18, 0.7)',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
});

export default WelcomeScreen;
