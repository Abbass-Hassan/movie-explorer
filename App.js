import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FavoritesProvider>
      <StatusBar style="light" />
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </FavoritesProvider>
  );
}
