import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import styles from './AuthScreen.styles';

// Parámetros para el checkerboard
const { height } = Dimensions.get('window');
const SQUARE_SIZE = 20;
const NUM_COLS = 4;
const FOOTER_EXTRA = 120; // Ajusta si el footer es más grande
const NUM_ROWS = Math.ceil((height + FOOTER_EXTRA) / SQUARE_SIZE);
const opacities = Array.from({ length: NUM_ROWS }, (_, i) =>
  +(0.15 + (0.6 * i) / (NUM_ROWS - 1)).toFixed(2)
);

const AuthScreen = ({ navigation }: any) => {
  const [isLogged, setIsLogged] = React.useState(false);

  const exitApp = () => {
    Alert.alert(
      'Salir',
      '¿Estás seguro de que quieres salir de la aplicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  // Renderizar el patrón checkerboard como barra lateral derecha
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
        style={[styles.container, { paddingTop: statusBarHeight }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Patrón checkerboard barra lateral derecho atrás del contenido */}
        {renderSidebar()}

        <TouchableOpacity style={styles.exitButton} onPress={exitApp}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.logo}
          />

          {isLogged ? (
            <>
              <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
              <TouchableOpacity
                style={[styles.button, styles.mainButton]}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>Continuar a la App</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>¡Bienvenido!</Text>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={() => navigation.navigate('Todo')}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={() => navigation.navigate('Todo')}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Sin Registro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={() => navigation.navigate('Todo')}
              >
                <Text style={styles.buttonText}>Sin Datos</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.footerText}>Respaldado por:</Text>
        <Text style={styles.footer1Text}>Global Solutions IA</Text>
      </LinearGradient>
    </>
  );
};

export default AuthScreen;
