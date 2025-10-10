import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useUserStore, setStorageService as setUserStorageService } from '@quiz/shared/stores/userStore';
import { setStorageService as setSettingsStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from '@quiz/shared/services/StorageService';

function App() {
  const { loadUserProfile } = useUserStore();

  useEffect(() => {
    // Initialize stores with storage service
    setUserStorageService(storageService);
    setSettingsStorageService(storageService);

    // Load user profile on mount
    loadUserProfile(storageService);
  }, []);

  return <AppRoutes />;
}

export default App;
