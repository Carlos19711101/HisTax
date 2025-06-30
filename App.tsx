import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

// Imports de las pantallas
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import DailyScreen from './src/screens/DailyScreen';
import PreventiveScreen from './src/screens/PreventiveScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TodoScreen from './src/screens/TodoScreen';
import RouteScreen from './src/screens/RouteScreen';
import GeneralScreen from './src/screens/GeneralScreen';

// Tipos de rutas
type RootStackParamList = {
  Welcome: undefined;
  AuthScreen: undefined;
  Daily: undefined;
  Todo: undefined;
  General: undefined;
  Preventive: undefined;
  Emergency: undefined;
  Profile: undefined;
  Route: undefined;
};

// Tipos para navegación
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthScreen'>;
export type DailyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Daily'>;
export type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Todo'>;
export type GeneralScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'General'>;
export type PreventiveScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preventive'>;
export type EmergencyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Emergency'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type RouteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Route'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      {/* Configuración global del StatusBar */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="Daily" component={DailyScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="General" component={GeneralScreen} />
          <Stack.Screen name="Preventive" component={PreventiveScreen} />
          <Stack.Screen name="Emergency" component={EmergencyScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Route" component={RouteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}