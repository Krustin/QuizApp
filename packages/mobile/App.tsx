import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { useUserStore, setStorageService as setUserStorageService } from '@quiz/shared/stores/userStore';
import { setStorageService as setSettingsStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from './src/services/StorageService';

export default function App() {
  const { loadUserProfile } = useUserStore();

  useEffect(() => {
    // Initialize stores with storage service
    setUserStorageService(storageService);
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
