import { StyleSheet, ViewStyle, TextStyle, ImageStyle, StatusBar } from 'react-native';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  title2: TextStyle;
  subtitle: TextStyle;
  welcomeText: TextStyle;
  button: ViewStyle;
  mainButton: ViewStyle;
  googleButton: ViewStyle;
  emailButton: ViewStyle;
  buttonText: TextStyle;
  buttonText2: TextStyle;
  divider: ViewStyle;
  dividerLine: ViewStyle;
  dividerText: TextStyle;
  exitButton: ViewStyle;
  registerLink: ViewStyle;
  registerText: TextStyle;
  registerBold: TextStyle;
  footerText: TextStyle;
  footer1Text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
  
  },
  content: {
    marginTop: -80,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#4c4e5b',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
    backgroundColor: '#cacbd6',
  },
  emailButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF7E5F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText2: {
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
    backgroundColor: 'white',
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
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#4c4e5b',
  },
  registerBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
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

export default styles;