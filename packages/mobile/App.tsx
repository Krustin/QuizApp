import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { useUserStore } from '@quiz/shared/stores/userStore';
import { setStorageService as setSettingsStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from './src/services/StorageService';

export default function App() {
  const { loadUserProfile } = useUserStore();

  useEffect(() => {
    // Initialize settings store with storage service
    setSettingsStorageService(storageService);

    // Load user profile on mount
    loadUserProfile(storageService);
  }, []);

  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}
