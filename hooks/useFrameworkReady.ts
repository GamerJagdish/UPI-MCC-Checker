import { useEffect } from 'react';
import { Platform } from 'react-native';

export const useFrameworkReady = () => {
  useEffect(() => {
    // Placeholder for any framework-specific initialization
    // Keeps a consistent hook API for future enhancements
    if (Platform.OS === 'web') {
      // No-op for now
    }
  }, []);
};
