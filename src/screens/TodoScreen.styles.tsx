import { StyleSheet, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CARD_WIDTH = width * 0.6;  // 60% width for center card
export const SPACING = 0.6;
export const MARGIN_HORIZONTAL = (width - CARD_WIDTH) / 2 - SPACING;

export const SQUARE_SIZE = 20;
export const NUM_COLS = 4;
export const CHECKERBOARD_HEIGHT = height; // Cambiado para cubrir toda la pantalla
export const NUM_ROWS = Math.ceil(CHECKERBOARD_HEIGHT / SQUARE_SIZE) + 2;

// Gradiente vertical de opacidad para cuadros negros del patrón
export const opacities = Array.from({ length: NUM_ROWS }, (_, i) =>
  +(0.10 + (0.6 * i) / (NUM_ROWS - 1)).toFixed(2)
);

interface Styles {
  containerGlobal: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  scrollContainer: ViewStyle;
  card: ViewStyle;
  cardImage: ImageStyle;
  cardTitle: TextStyle;
  cardSubtitle: TextStyle;
  backButton: ViewStyle;
  pagination: ViewStyle;
  paginationDot: ViewStyle;
  paginationDotActive: ViewStyle;
  title: TextStyle;
  sidebarContainer: ViewStyle;
  row: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
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
    left: 20,
    zIndex: 10,
    padding: 5,
    marginTop: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(13, 13, 14, 0.14)', // color para contraste
    marginBottom: 10,
    marginTop: 5,
    right: -10,
  },
  // Checkerboard sidebar
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
});

export default styles;