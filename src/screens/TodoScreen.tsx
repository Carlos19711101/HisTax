import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Image,
  BackHandler, 
  Alert,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6; // 60% para tarjeta central
const SIDE_CARD_WIDTH = width * 0.4; // 40% para tarjetas laterales
const SPACING = 0.6;
const MARGIN_HORIZONTAL = (width - CARD_WIDTH) / 2 - SPACING;

interface CardItem {
  id: string;
  color?: string;
  text?: string;
  title?: string;
  subtitle?: string;
  screenName?: string;
  image?: string;
}

interface TodoScreenProps {
  navigation: {
    navigate: (screenName: string) => void;
    goBack: () => void;
  };
}

const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }: any) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array de imágenes de prueba
  const demoImages = [
    'https://cdn-icons-png.flaticon.com/512/3652/3652191.png', // Calendario
    'https://cdn-icons-png.flaticon.com/128/4606/4606919.png',   // Herramientas
    'https://cdn-icons-png.flaticon.com/128/805/805680.png', // Emergencia
    'https://cdn-icons-png.flaticon.com/128/1048/1048334.png', // Perfil
    'https://cdn-icons-png.flaticon.com/128/1133/1133816.png',   // Ruta
    'https://cdn-icons-png.flaticon.com/128/11133/11133672.png'// Mantenimiento
    
  ];

  // Tarjetas originales
  const originalCards: CardItem[] = [
    { 
      id: '1', 
      title: 'Profile', 
      subtitle: 'Motocicleta \n Datos  ',
      color: '#33ee0d', // Verde
      screenName: 'Profile',
      image: demoImages[3]
    },
    { 
      id: '2', 
      title: 'Daily', 
      subtitle: 'Actividades \n Diarias',
      color: '#eb0dee', // Fusia
      screenName: 'Daily',
      image: demoImages[0]
    },
    
    { 
      id: '3', 
      title: 'Preventive', 
      subtitle: 'Mantenimiento preventivo',
      color: '#0deeda', // Azul Aguamarina
      screenName: 'Preventive',
      image: demoImages[1]
    },
    { 
      id: '4', 
      title: 'Mantenimiento', 
      subtitle: 'General ',
      color: '#090FFA', // Azul
      screenName: 'General',
      image: demoImages[5]
    },
    { 
      id: '5', 
      title: 'Emergency', 
      subtitle: 'Casos de emergencia',
      color: '#FF5252', // Rojo
      screenName: 'Emergency',
      image: demoImages[2]
    },
    { 
      id: '6', 
      title: 'Route', 
      subtitle: '  Rutas \n  recorridos',
      color: '#810dee', // Morado
      screenName: 'Route',
      image: demoImages[4]
    },
  ];

  // Duplicamos tarjetas para efecto infinito
  const cards = [
    ...originalCards.slice(-1).map(card => ({ ...card, id: `pre-${card.id}` })),
    ...originalCards,
    ...originalCards.slice(0, 1).map(card => ({ ...card, id: `post-${card.id}` })),
  ];

  const totalCards = originalCards.length;

  // Configuración inicial del scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: CARD_WIDTH + SPACING * 2, // Posición inicial (segunda tarjeta)
          animated: false,
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + SPACING * 2));
    
    // Efecto infinito
    if (index >= cards.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: CARD_WIDTH + SPACING * 2, // Vuelve al inicio real
        animated: false,
      });
    } else if (index <= 0) {
      scrollViewRef.current?.scrollTo({
        x: (CARD_WIDTH + SPACING * 2) * (cards.length - 2), // Vuelve al final real
        animated: false,
      });
    }

    // Actualizar índice actual
    const adjustedIndex = (index - 1 + totalCards) % totalCards;
    setCurrentIndex(adjustedIndex);

    // Animación
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    )(event);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + SPACING * 2));
    const adjustedIndex = (index - 1 + totalCards) % totalCards;
    setCurrentIndex(adjustedIndex);
  };

  const handleCardPress = (screenName: string | undefined) => {
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  const exitApp = () => {
    Alert.alert(
      'Salir',
      '¿Estás seguro de que quieres salir de la aplicación?',
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
      colors={['#090FFA','#88D3CE', '#6E45E2']}
      style={styles.containerGlobal}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('AuthScreen')}
      >
        <AntDesign name="doubleleft" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.content}> 
        <Text style={styles.title}>Tus Historias</Text>
      </View>

      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          decelerationRate={Platform.OS === 'ios' ? 0.99 : 0.95}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING * 2}
          contentContainerStyle={styles.scrollContainer}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          directionalLockEnabled={true}
          alwaysBounceHorizontal={false}
          bounces={false}
          overScrollMode="never"
        >
          {cards.map((card, index) => {
            const inputRange = [
              (index - 1) * (CARD_WIDTH + SPACING * 2),
              index * (CARD_WIDTH + SPACING * 2),
              (index + 1) * (CARD_WIDTH + SPACING * 2),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 0.9, 0.8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity 
                key={card.id}
                activeOpacity={0.8}
                onPress={() => handleCardPress(card.screenName)}
              >
                <Animated.View
                  style={[
                    styles.card,
                    {
                      width: CARD_WIDTH,
                      backgroundColor: card.color,
                      transform: [{ scale }],
                      opacity,
                      marginLeft: index === 0 ? MARGIN_HORIZONTAL : SPACING,
                      marginRight: index === cards.length - 1 ? MARGIN_HORIZONTAL : SPACING,
                    },
                  ]}
                >
                  {card.image && (
                    <Image 
                      source={{ uri: card.image }} 
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        {/* Indicadores de posición */}
        <View style={styles.pagination}>
          {originalCards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
  },
  container: {
    height: 420,
    marginVertical: 80,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    height: 400,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 10,
    padding: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#333',
    width: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop: 30,
    right: -5,
  },
});

export default TodoScreen;
