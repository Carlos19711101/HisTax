import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

// Checkerboard config
export const SQUARE_SIZE = 20;
export const NUM_COLS = 4;
export const CHECKERBOARD_HEIGHT = height;
export const NUM_ROWS = Math.ceil(CHECKERBOARD_HEIGHT / SQUARE_SIZE) + 2;
export const opacities = Array.from({ length: NUM_ROWS }, (_, i) =>
  +(0.10 + (0.6 * i) / (NUM_ROWS - 1)).toFixed(2)
);

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  keyboardAvoidingView: ViewStyle;
  backButton: ViewStyle;
  backButtonIcon: ViewStyle;
  entriesList: ViewStyle;
  entryContainer: ViewStyle;
  entryHeader: ViewStyle;
  entryDate: TextStyle;
  deleteButton: ViewStyle;
  entryText: TextStyle;
  entryImage: ImageStyle;
  timelineConnector: ViewStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  mediaButton: ViewStyle;
  sendButton: ViewStyle;
  imagePreviewContainer: ViewStyle;
  imagePreview: ImageStyle;
  removeImageButton: ViewStyle;
  listFooter: ViewStyle;
  title: TextStyle;
  cameraModalButton: ViewStyle;
  sidebarContainer: ViewStyle;
  row: ViewStyle;
  footerContainer: ViewStyle;
  footerContent: ViewStyle;
  searchAddressButton: ViewStyle;
  searchAddressText: TextStyle;
  searchIcon: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20, // ✅ Añadido para mejor espaciado
  },
  keyboardAvoidingView: {
    flex: 1,
    paddingTop: 5, // ✅ Añadido para mejor espaciado
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20, // ✅ Corregido: más a la izquierda
    zIndex: 10,
    padding: 10, // ✅ Añadido para mejor tappability
  },
  backButtonIcon: {
    marginLeft: 0,
    marginTop: -5,
  },
  entriesList: {
    paddingBottom: 20,
    paddingTop: 10, // ✅ Añadido para mejor espaciado
  },
  entryContainer: {
    backgroundColor: 'rgba(177, 169, 6, 0.8)', // ✅ Aumentada opacidad para mejor legibilidad
    borderRadius: 10,
    padding: 15, // ✅ Aumentado padding para mejor apariencia
    marginHorizontal: 8,
    marginVertical: 8,
    position: 'relative',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryDate: {
    color: 'rgba(255, 255, 255, 0.99)', // ✅ Mejor contraste
    fontSize: 12,
    fontWeight: '500', // ✅ Añadido peso para mejor legibilidad
  },
  deleteButton: {
    padding: 5,
  },
  entryText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.99)', // ✅ Mejor contraste
    marginTop: 5,
    lineHeight: 20, // ✅ Añadido para mejor legibilidad
  },
  entryImage: {
    width: '100%',
    height: 200, // ✅ Reducido para mejor proporción
    borderRadius: 8,
    marginTop: 8,
  },
  timelineConnector: {
    position: 'absolute',
    left: -15,
    top: 30,
    bottom: -8,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // ✅ Mejor visibilidad
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20, // ✅ Corregido: mejor margen inferior
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // ✅ Mejor contraste con fondo amarillo
    marginHorizontal: 8, // ✅ Añadido para mejor alineación
    borderRadius: 25, // ✅ Añadido bordes redondeados
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // ✅ Mejor contraste
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    maxHeight: 100,
    color: '#333',
    fontSize: 13, // ✅ Añadido tamaño de fuente consistente
  },
  mediaButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
    marginLeft: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // ✅ Añadido fondo para mejor visibilidad
    borderRadius: 20,
  },
  imagePreviewContainer: {
    position: 'relative',
    padding: 10,
    alignItems: 'center', // ✅ Centrado
  },
  imagePreview: {
    width: 120, // ✅ Tamaño ligeramente mayor
    height: 120,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // ✅ Mejor contraste
    borderRadius: 15,
    padding: 5,
  },
  listFooter: {
    height: 20,
  },
  title: {
    fontSize: 24, // ✅ Tamaño aumentado para mejor jerarquía
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.9)', // ✅ Color más oscuro para mejor contraste
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center', // ✅ Centrado
  },
  cameraModalButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 50,
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
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  // ✅ Añadidos estilos para el botón de búsqueda (copiados del primer screen)
  searchAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.34)', // ✅ Color que contrasta con fondo amarillo
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: '#000', // ✅ Añadida sombra para mejor apariencia
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchAddressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10, // ✅ Mejor espaciado con icono
  },
  searchIcon: {
    marginRight: 5, // ✅ Mejor posicionamiento
  },
});

export default styles;