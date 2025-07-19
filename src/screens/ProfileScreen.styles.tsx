// ProfileScreen.styles.ts

import { StyleSheet, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SQUARE_SIZE = 20;
export const CHECKERBOARD_HEIGHT = height * 0.9; // altura que quieres cubrir
export const NUM_COLS = Math.ceil(width / SQUARE_SIZE) + 5;  // columnas suficientes para ancho completo
export const NUM_ROWS = Math.ceil(CHECKERBOARD_HEIGHT / SQUARE_SIZE) + 5; // filas según altura

const avatarSize = width * 0.7;
const editButtonSize = avatarSize * 0.20;

interface Styles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  header: ViewStyle;
  avatarContainer: ViewStyle;
  avatar: ImageStyle;
  backButton: ViewStyle;
  editAvatarButton: ViewStyle;
  editAvatarButtonText: TextStyle;
  actionsContainer: ViewStyle;
  editButton: ViewStyle;
  editButtonCompact: ViewStyle;
  editButtonText: TextStyle;
  centeredInfoContainer: ViewStyle;
  resultText: TextStyle;
  resultTextRight: TextStyle;
  verticalButtonRow: ViewStyle;
  buttonWithResult: ViewStyle;
  imagePickerModalOverlay: ViewStyle;
  imagePickerModalContent: ViewStyle;
  imagePickerModalOption: ViewStyle;
  imagePickerModalOptionText: TextStyle;
  imagePickerModalCancel: ViewStyle;
  imagePickerModalCancelText: TextStyle;
  editModalOverlay: ViewStyle;
  editModalContent: ViewStyle;
  editModalTitle: TextStyle;
  editModalInput: TextStyle;
  editModalButtonRow: ViewStyle;
  editModalSaveButton: ViewStyle;
  editModalSaveButtonText: TextStyle;
  editModalCancelButton: ViewStyle;
  editModalCancelButtonText: TextStyle;
  footerContainer: ViewStyle;
  footerContent: ViewStyle;

  checkerboardWrapper: ViewStyle;
  row: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: avatarSize / 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  editAvatarButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: editButtonSize,
    height: editButtonSize,
    borderRadius: editButtonSize / 2,
    right: editButtonSize * 0.2,
    bottom: editButtonSize * 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  editAvatarButtonText: {
    fontSize: width * 0.04,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: width * 0.05,
  },
  editButton: {
    backgroundColor: 'rgba(70, 6, 6, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonCompact: {
    backgroundColor: 'rgba(70, 6, 6, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: width * 0.038,
    color: '#fff',
  },
  centeredInfoContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  resultText: {
    fontSize: width * 0.05,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  resultTextRight: {
    flex: 1,
    fontSize: width * 0.045,
    color: 'rgba(20, 13, 17, 0.3)',
    fontWeight: 'bold',
    marginLeft: 15,
    alignSelf: 'center',
  },
  verticalButtonRow: {
    marginTop: 20,
    paddingHorizontal: width * 0.05,
  },
  buttonWithResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  imagePickerModalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imagePickerModalOption: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  imagePickerModalOptionText: {
    fontSize: 19,
    color: '#090FFA',
    fontWeight: 'bold',
  },
  imagePickerModalCancel: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  imagePickerModalCancelText: {
    fontSize: 16,
    color: '#888',
  },
  editModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  editModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 8,
  },
  editModalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  editModalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
    marginBottom: 20,
    color: '#222',
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
  },
  editModalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editModalSaveButton: {
    backgroundColor: '#090FFA',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  editModalSaveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editModalCancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  editModalCancelButtonText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
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
  // Checkerboard styles
  checkerboardWrapper: {
    position: 'absolute',
    top: 90,
    left: -75,
    bottom: 0,
    width: width + 50,   // ancho pantalla + margen para garantizar cobertura tras rotar
    height: CHECKERBOARD_HEIGHT,
    overflow: 'hidden',
    flexDirection: 'column',
    transform: [{ rotate: '70deg' }],
    zIndex: 0,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});

export default styles;
