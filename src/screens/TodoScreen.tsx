// screens/TodoScreen.tsx

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

// 1. IMPORTAMOS los estilos y las constantes de layout desde el archivo de estilos.
import styles, { CARD_WIDTH, SPACING, MARGIN_HORIZONTAL } from './TodoScreen.styles';

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
  };
}

const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lógica de datos y estado (sin cambios)
  const demoImages = [
    'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
    'https://cdn-icons-png.flaticon.com/128/4606/4606919.png',
    'https://cdn-icons-png.flaticon.com/128/805/805680.png',
    'https://cdn-icons-png.flaticon.com/128/1048/1048334.png',
    'https://cdn-icons-png.flaticon.com/128/1133/1133816.png',
    'https://cdn-icons-png.flaticon.com/128/11133/11133672.png'
  ];

  const originalCards: CardItem[] = [
    { id: '1', title: 'Profile', subtitle: 'Motocicleta \n Datos  ', color: '#33ee0d', screenName: 'Profile', image: demoImages[3] },
    { id: '2', title: 'Daily', subtitle: 'Actividades \n Diarias', color: '#eb0dee', screenName: 'Daily', image: demoImages[0] },
    { id: '3', title: 'Preventive', subtitle: 'Mantenimiento preventivo', color: '#0deeda', screenName: 'Preventive', image: demoImages[1] },
    { id: '4', title: 'Mantenimiento', subtitle: 'General ', color: '#090FFA', screenName: 'General', image: demoImages[5] },
    { id: '5', title: 'Emergency', subtitle: 'Casos de emergencia', color: '#FF5252', screenName: 'Emergency', image: demoImages[2] },
    { id: '6', title: 'Route', subtitle: '  Rutas \n  recorridos', color: '#810dee', screenName: 'Route', image: demoImages[4] },
  ];

  const cards = [
    ...originalCards.slice(-1).map(card => ({ ...card, id: `pre-${card.id}` })),
    ...originalCards,
    ...originalCards.slice(0, 1).map(card => ({ ...card, id: `post-${card.id}` })),
  ];

  const totalCards = originalCards.length;

  // Lógica de efectos y manejadores (sin cambios)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: CARD_WIDTH + SPACING * 2,
          animated: false,
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + SPACING * 2));
    
    if (index >= cards.length - 1) {
      scrollViewRef.current?.scrollTo({ x: CARD_WIDTH + SPACING * 2, animated: false });
    } else if (index <= 0) {
      scrollViewRef.current?.scrollTo({ x: (CARD_WIDTH + SPACING * 2) * (cards.length - 2), animated: false });
    }

    const adjustedIndex = (index - 1 + totalCards) % totalCards;
    setCurrentIndex(adjustedIndex);

    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })(event);
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

  return (
    <LinearGradient colors={['#090FFA','#88D3CE', '#6E45E2']} style={styles.containerGlobal}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AuthScreen')}>
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
            const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 0.9, 0.8], extrapolate: 'clamp' });
            const opacity = scrollX.interpolate({ inputRange, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });

            return (
              <TouchableOpacity key={card.id} activeOpacity={0.8} onPress={() => handleCardPress(card.screenName)}>
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
                  {card.image && <Image source={{ uri: card.image }} style={styles.cardImage} resizeMode="contain" />}
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.pagination}>
          {originalCards.map((_, index) => (
            <View key={index} style={[ styles.paginationDot, currentIndex === index && styles.paginationDotActive ]} />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

// 2. EL BLOQUE StyleSheet.create HA SIDO ELIMINADO DE AQUÍ
export default TodoScreen;