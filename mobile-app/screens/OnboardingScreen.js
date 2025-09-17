import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// IMPORTANT: Replace this with your computer's IP address!
const API_URL = 'http://172.42.0.186:5003/api/v1';

const OnboardingScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [documentId, setDocumentId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async () => {
    if (!name || !documentId) {
      Alert.alert('Error', 'Please enter your name and document ID.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: name,
        documentId: documentId,
      });
      const { touristId, idHash } = response.data.data;
      await SecureStore.setItemAsync('touristId', touristId);
      await SecureStore.setItemAsync('idHash', idHash);
      navigation.replace('Main', { name: name });
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Failed', 'Could not connect to the server. Please check the API URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#FF8C00', '#000080']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome, Tourist!</Text>
        <Text style={styles.subtitle}>Register for your safety ID.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mock Passport/Aadhaar No."
          placeholderTextColor="#ccc"
          value={documentId}
          onChangeText={setDocumentId}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF8C00" />
        ) : (
          <Button
            title="Generate Secure ID"
            onPress={handleRegister}
            color="#FF8C00"
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
  }
});

export default OnboardingScreen;