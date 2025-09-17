import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// IMPORTANT: Use the same IP Address as in your OnboardingScreen.js!
const API_URL = 'http://172.42.0.186:5003/api/v1';

const MainScreen = ({ route, navigation }) => {
  const { name } = route.params || { name: 'Tourist' };
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('Press the button in case of emergency.');

  // This effect runs once when the screen loads to request location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to use the panic button feature.');
        setStatusText('Location permission denied.');
      }
    })();
  }, []);

  const handlePanicPress = async () => {
    setIsLoading(true);
    setStatusText('Sending alert...');
    
    try {
      // 1. Get the touristId we saved during onboarding
      const touristId = await SecureStore.getItemAsync('touristId');
      if (!touristId) {
        throw new Error('Tourist ID not found. Please restart the app.');
      }

      // 2. Get the device's current GPS location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 3. Send the alert to the backend API
      await axios.post(`${API_URL}/alert`, {
        touristId: touristId,
        location: {
          lat: latitude,
          lon: longitude,
        },
      });

      // 4. Give feedback to the user
      Alert.alert('Alert Sent', 'Help is on the way. Your location has been shared with the authorities.');
      setStatusText('Alert successfully sent.');

    } catch (error) {
      console.error(error);
      Alert.alert('Failed to Send Alert', 'Could not send the alert. Please check your connection and try again.');
      setStatusText('Failed to send. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#FF8C00', '#000080']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome, {name}!</Text>
        </View>

        <TouchableOpacity 
          style={styles.panicButton} 
          onPress={handlePanicPress} 
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text style={styles.panicButtonText}>PANIC</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>{statusText}</Text>
          <Button
            title="View My Digital ID"
            onPress={() => navigation.navigate('DigitalId', { name: name })}
            color="#FF8C00"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    width: '80%',
  },
  header: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  panicButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  panicButtonText: {
    color: 'white',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footer: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default MainScreen;
