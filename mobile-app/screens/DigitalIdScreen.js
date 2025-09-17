import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import QRCode from 'react-native-qrcode-svg';

const DigitalIdScreen = ({ route }) => {
  const { name } = route.params;
  const [idData, setIdData] = useState({ touristId: null, idHash: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function runs when the screen loads
    const fetchIdData = async () => {
      try {
        // Retrieve the data we saved during onboarding
        const touristId = await SecureStore.getItemAsync('touristId');
        const idHash = await SecureStore.getItemAsync('idHash');
        setIdData({ touristId, idHash });
      } catch (error) {
        console.error("Failed to load ID data from secure store", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdData();
  }, []); // The empty array ensures this runs only once

  // Prepare the data to be embedded in the QR code
  const qrCodeValue = JSON.stringify({
    touristId: idData.touristId,
    idHash: idData.idHash
  });

  if (isLoading) {
    return (
      <LinearGradient colors={['#FF8C00', '#000080']} style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FF8C00', '#000080']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.qrContainer}>
          {idData.touristId ? (
            <QRCode
              value={qrCodeValue}
              size={250}
              backgroundColor="white"
              color="black"
            />
          ) : (
            <Text style={styles.infoText}>Could not generate QR Code.</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.labelText}>TOURIST ID:</Text>
          <Text style={styles.infoText}>{idData.touristId || 'N/A'}</Text>
          <Text style={styles.labelText}>SECURE HASH (Mock Blockchain):</Text>
          <Text style={styles.infoText_small}>{idData.idHash || 'N/A'}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    color: '#FF8C00',
    fontWeight: '600',
    marginTop: 15,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  infoText_small: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'monospace'
  },
});

export default DigitalIdScreen;
