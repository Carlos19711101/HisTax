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
  container: ViewStyle;
  content: ViewStyle;
  keyboardAvoidingView: ViewStyle;
  backButton: ViewStyle;
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
  sidebarContainer: ViewStyle;
  row: ViewStyle;
  footerContainer: ViewStyle;
  footerContent: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  entriesList: {
    paddingBottom: 20,
  },
  entryContainer: {
    backgroundColor: 'rgba(177, 169, 6, 0.56)',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
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
    color: 'rgba(14, 14, 14, 0.99)',
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
  },
  entryText: {
    fontSize: 16,
    color: 'rgba(14, 14, 14, 0.99)',
    marginTop: 5,
  },
  entryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  timelineConnector: {
    position: 'absolute',
    left: -15,
    top: 30,
    bottom: -8,
    width: 2,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(14, 14, 14, 0.50)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    maxHeight: 100,
    color: '#333',
  },
  mediaButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
    marginLeft: 5,
  },
  imagePreviewContainer: {
    position: 'relative',
    padding: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 2,
  },
  listFooter: {
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(14, 14, 14, 0.99)',
    marginBottom: 30,
    marginTop: 10,
    right: -5,
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
});

export default styles;