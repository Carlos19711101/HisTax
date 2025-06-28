// import React from 'react';
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

// 1. Define los tipos de rutas
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

// 2. Exporta los tipos para usarlos en las pantallas
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthScreen'>;
export type DailyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Daily'>;
export type TodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Todo'>;
// CORRECCIÓN 2: Se corrigió el typo de "Generalcreen" a "GeneralScreen".
export type GeneralScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'General'>;
export type PreventiveScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preventive'>;
export type EmergencyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Emergency'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type RouteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Route'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // La ruta inicial por defecto es la primera de la lista: "Welcome"
        initialRouteName="Welcome" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6E45E2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Daily"
          component={DailyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="General"
          component={GeneralScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Preventive"
          component={PreventiveScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Route"
          component={RouteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}