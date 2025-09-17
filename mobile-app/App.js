import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our screens
import OnboardingScreen from './screens/OnboardingScreen';
import MainScreen from './screens/MainScreen';
import DigitalIdScreen from './screens/DigitalIdScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        {/* Digital ID Screen */}
        <Stack.Screen 
          name="DigitalId" 
          component={DigitalIdScreen} 
          options={{ 
            headerShown: true,
            title: 'Your Secure Digital ID',
            headerStyle: {
              backgroundColor: '#000080',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}