import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useUserStore } from '@quiz/shared/stores/userStore';
import { setStorageService as setSettingsStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from './services/StorageService';

function App() {
  const { loadUserProfile } = useUserStore();

  useEffect(() => {
    // Initialize settings store with storage service
    setSettingsStorageService(storageService);

    // Load user profile on mount
    loadUserProfile(storageService);
  }, []);

  return <AppRoutes />;
}

export default App;
