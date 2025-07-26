import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80, // Para margen al footer
  },
  sidebarContainer: {
    position: 'absolute',
    right: 0,       // Barra lateral a la derecha
    top: 0,
    bottom: 0,
    width: 20 * 4,  // 4 cuadros ancho * tamaño 20px
    flexDirection: 'column',
    zIndex: 0,      // Detrás del contenido
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    marginTop: -80,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(9, 13, 9, 0.7)',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(18, 24, 18, 0.92)',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#cacbd6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainButton: {
    backgroundColor: 'white',
  },
  googleButton: {
    backgroundColor: 'rgba(70, 6, 6, 0.2)',
  },
  buttonText: {
    color: 'rgba(248, 243, 243, 0.94)',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(18, 25, 18, 0.7)',
    opacity: 0.5,
  },
  dividerText: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 14,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    margin: 10,
    padding: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 100,
    color: 'rgba(14, 14, 14, 0.99)',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
  footer1Text: {
    position: 'absolute',
    bottom: 70,
    color: 'rgba(14, 14, 14, 0.99)',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
});

export default styles;
